import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  AsYouType,
} from "libphonenumber-js";

// Regional flag emoji generator from 2-letter ISO code
const getFlagEmoji = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
};

// Preferred country mapping for shared dial codes (e.g. +1 -> US, +44 -> GB)
const PREFERRED_COUNTRY_MAPPING = {
  "1": "US",
  "44": "GB",
  "7": "RU",
  "590": "GP",
  "61": "AU",
  "358": "FI",
};

// Top popular countries to pin at the top of the dropdown
const POPULAR_COUNTRIES = [
  "IN", // India (default)
  "US", // United States
  "GB", // United Kingdom
  "AE", // United Arab Emirates
  "CA", // Canada
  "AU", // Australia
  "DE", // Germany
  "SG", // Singapore
  "SA", // Saudi Arabia
  "FR", // France
  "NZ", // New Zealand
  "QA", // Qatar
  "KW", // Kuwait
  "OM", // Oman
];

// Helper to get English country names
const getCountryName = (code) => {
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code) || code;
  } catch (e) {
    return code;
  }
};

// Build country list once
const ALL_COUNTRIES = getCountries().map((code) => {
  const dialCode = `+${getCountryCallingCode(code)}`;
  const name = getCountryName(code);
  const flag = getFlagEmoji(code);
  return {
    code,
    name,
    dialCode,
    flag,
    isPopular: POPULAR_COUNTRIES.includes(code),
  };
});

// Map of dial code -> country code (sorted by dial code length descending for greedy match)
const DIAL_CODE_MAP = new Map();
ALL_COUNTRIES.forEach((c) => {
  const digits = c.dialCode.replace("+", "");
  if (!DIAL_CODE_MAP.has(digits) || PREFERRED_COUNTRY_MAPPING[digits] === c.code) {
    DIAL_CODE_MAP.set(digits, c.code);
  }
});

const SORTED_DIAL_CODES = Array.from(DIAL_CODE_MAP.keys()).sort(
  (a, b) => b.length - a.length
);

export default function CountryPhoneInput({
  value = "",
  onChange,
  required = false,
  disabled = false,
  id = "phone-input",
}) {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [detectedCountryNotice, setDetectedCountryNotice] = useState(null);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const searchInputRef = useRef(null);

  // Active country object
  const activeCountry = useMemo(() => {
    return (
      ALL_COUNTRIES.find((c) => c.code === selectedCountry) ||
      ALL_COUNTRIES.find((c) => c.code === "IN")
    );
  }, [selectedCountry]);

  // Sync external value when reset
  useEffect(() => {
    if (!value) {
      setPhoneNumber("");
      setDetectedCountryNotice(null);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto focus search input when opened
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      // Show popular countries first, then all alphabetically
      const popular = ALL_COUNTRIES.filter((c) => c.isPopular);
      const others = ALL_COUNTRIES.filter((c) => !c.isPopular).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return { popular, others };
    }

    const q = searchQuery.toLowerCase().trim().replace("+", "");
    const matches = ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.replace("+", "").startsWith(q) ||
        c.code.toLowerCase().includes(q)
    ).sort((a, b) => {
      // 1. Exact dial code match comes first (e.g. searching '91' puts India first)
      const aDialMatch = a.dialCode.replace("+", "") === q;
      const bDialMatch = b.dialCode.replace("+", "") === q;
      if (aDialMatch && !bDialMatch) return -1;
      if (!aDialMatch && bDialMatch) return 1;

      // 2. Popular countries come next
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;

      // 3. Name starts with query comes next (e.g. 'ind' puts India before Indonesia)
      const aNameStarts = a.name.toLowerCase().startsWith(q);
      const bNameStarts = b.name.toLowerCase().startsWith(q);
      if (aNameStarts && !bNameStarts) return -1;
      if (!aNameStarts && bNameStarts) return 1;

      return a.name.localeCompare(b.name);
    });

    return { popular: [], others: matches };
  }, [searchQuery]);

  // Validate current number using libphonenumber-js
  const validationResult = useMemo(() => {
    if (!phoneNumber) return { isValid: false, formatted: "", isPossible: false };

    // Try parsing with selected country
    const parsed = parsePhoneNumberFromString(
      phoneNumber,
      selectedCountry
    );

    if (parsed) {
      return {
        isValid: parsed.isValid(),
        isPossible: parsed.isPossible(),
        formatted: parsed.formatInternational(),
        nationalNumber: parsed.nationalNumber,
      };
    }

    return { isValid: false, formatted: "", isPossible: false };
  }, [phoneNumber, selectedCountry]);

  // Handle typing inside the phone number input
  const handleInputChange = (e) => {
    const rawVal = e.target.value;

    // Check for auto-detection:
    // If the input starts with "+" or with a known country dial code
    const clean = rawVal.trim();
    let detectedCountry = null;
    let localPortion = rawVal;

    // Case 1: User typed "+..." e.g. "+91 9016738858" or "+1 415..."
    if (clean.startsWith("+")) {
      const digitsOnly = clean.slice(1).replace(/\D/g, "");
      for (const code of SORTED_DIAL_CODES) {
        if (digitsOnly.startsWith(code)) {
          detectedCountry = DIAL_CODE_MAP.get(code);
          localPortion = digitsOnly.slice(code.length);
          break;
        }
      }
    }
    // Case 2: User started typing a dial code directly without "+", e.g. "9190167..." or "91..."
    else {
      const digitsOnly = clean.replace(/\D/g, "");
      // Check if user is typing a dial code at the beginning
      for (const code of SORTED_DIAL_CODES) {
        // If the typed string begins with a dial code that is DIFFERENT from current or explicitly matches
        if (digitsOnly.startsWith(code) && (digitsOnly.length <= code.length + 1 || code.length >= 2)) {
          // If code is 91, 971, 44, 33, 49, etc.
          if (code === "91" || code === "971" || code === "44" || code === "61" || code === "49" || code === "65" || code === "966" || code === "81") {
            detectedCountry = DIAL_CODE_MAP.get(code);
            // If they typed more digits after the code, strip the code from national input
            if (digitsOnly.length > code.length) {
              localPortion = digitsOnly.slice(code.length);
            } else {
              localPortion = "";
            }
            break;
          }
        }
      }
    }

    // Apply auto-detected country if found and different
    if (detectedCountry && detectedCountry !== selectedCountry) {
      setSelectedCountry(detectedCountry);
      const detectedObj = ALL_COUNTRIES.find((c) => c.code === detectedCountry);
      if (detectedObj) {
        setDetectedCountryNotice(`Auto-detected ${detectedObj.flag} ${detectedObj.name} (${detectedObj.dialCode})`);
      }
    }

    // Format input using AsYouType
    const ayt = new AsYouType(detectedCountry || selectedCountry);
    const formatted = ayt.input(localPortion);
    setPhoneNumber(formatted);

    // Notify parent
    const full = `${(detectedCountry ? ALL_COUNTRIES.find((c) => c.code === detectedCountry)?.dialCode : activeCountry.dialCode)} ${formatted}`.trim();
    const parsed = parsePhoneNumberFromString(formatted, detectedCountry || selectedCountry);

    onChange?.({
      fullNumber: full,
      countryCode: detectedCountry || selectedCountry,
      dialCode: activeCountry.dialCode,
      nationalNumber: formatted,
      isValid: parsed ? parsed.isValid() : false,
    });
  };

  // Select a country from the dropdown
  const handleSelectCountry = (country) => {
    setSelectedCountry(country.code);
    setIsDropdownOpen(false);
    setSearchQuery("");
    setDetectedCountryNotice(null);

    // Re-format current digits for new country
    const ayt = new AsYouType(country.code);
    const formatted = ayt.input(phoneNumber);
    setPhoneNumber(formatted);

    const full = `${country.dialCode} ${formatted}`.trim();
    const parsed = parsePhoneNumberFromString(formatted, country.code);

    onChange?.({
      fullNumber: full,
      countryCode: country.code,
      dialCode: country.dialCode,
      nationalNumber: formatted,
      isValid: parsed ? parsed.isValid() : false,
    });

    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Box Wrapper */}
      <div className="flex items-center h-11 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 bg-white transition-all shadow-sm">
        {/* Country Selector Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1.5 pl-3.5 pr-2.5 h-full text-slate-700 hover:text-slate-900 border-r border-slate-200 cursor-pointer select-none outline-none group shrink-0 transition-colors"
          title={`Selected: ${activeCountry.name} (${activeCountry.dialCode})`}
          aria-label="Select Country"
        >
          <span className="text-xl leading-none">{activeCountry.flag}</span>
          <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
            {activeCountry.dialCode}
          </span>
          <svg
            className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180 text-blue-600" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* National Number Input */}
        <input
          ref={inputRef}
          id={id}
          type="tel"
          disabled={disabled}
          required={required}
          value={phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter Contact Number (e.g. 91... for India)"
          className="h-full px-3 w-full outline-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Right validation icon */}
        {phoneNumber && (
          <div className="pr-3 flex items-center shrink-0">
            {validationResult.isValid ? (
              <span
                className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold"
                title="Valid Phone Number"
              >
                ✓
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPhoneNumber("");
                  setDetectedCountryNotice(null);
                  onChange?.({
                    fullNumber: "",
                    countryCode: selectedCountry,
                    dialCode: activeCountry.dialCode,
                    nationalNumber: "",
                    isValid: false,
                  });
                  inputRef.current?.focus();
                }}
                className="text-slate-400 hover:text-slate-600 text-xs px-1"
                title="Clear number"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Auto-detected badge or Validation Status */}
      <div className="flex items-center justify-between px-2 pt-1 text-[11px] min-h-[18px]">
        {detectedCountryNotice ? (
          <span className="text-indigo-600 font-medium animate-pulse flex items-center gap-1">
            <span>✨</span> {detectedCountryNotice}
          </span>
        ) : validationResult.isValid ? (
          <span className="text-emerald-600 font-medium">
            ✓ Valid number ({validationResult.formatted})
          </span>
        ) : phoneNumber ? (
          <span className="text-slate-400">
            {activeCountry.name} phone number
          </span>
        ) : (
          <span className="text-slate-400">
            Type country code (e.g. <strong>91</strong> for 🇮🇳 India) to auto-detect
          </span>
        )}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 sm:w-80 max-h-72 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          {/* Search Bar Header */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code (e.g. India, 91)..."
                className="w-full text-xs outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Country List */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100 text-xs">
            {/* Popular Section */}
            {filteredCountries.popular.length > 0 && (
              <div>
                <div className="px-3 py-1 bg-slate-100/60 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                  Popular Countries
                </div>
                {filteredCountries.popular.map((c) => (
                  <button
                    key={`pop-${c.code}`}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-indigo-50 transition-colors ${
                      c.code === selectedCountry ? "bg-indigo-50/70 font-semibold text-blue-700" : "text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                      {c.dialCode}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* All / Filtered Countries */}
            {filteredCountries.others.length > 0 ? (
              <div>
                {filteredCountries.popular.length > 0 && (
                  <div className="px-3 py-1 bg-slate-100/60 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    All Countries
                  </div>
                )}
                {filteredCountries.others.map((c) => (
                  <button
                    key={`all-${c.code}`}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-indigo-50 transition-colors ${
                      c.code === selectedCountry ? "bg-indigo-50/70 font-semibold text-blue-700" : "text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                      {c.dialCode}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No countries found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
