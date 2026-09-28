import React, { useState, useEffect } from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import CountryPhoneInput from "../Components/CountryPhoneInput";

export default function ContactUS() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ResetForm = () => {
    setName("");
    setEmail("");
    setNumber("");
    setIsPhoneValid(false);
    setMessage("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !message || !number) {
      return toast.error("Please enter all details");
    }
    if (!isPhoneValid) {
      return toast.error("Please enter a valid phone number for the selected country");
    }
    setLoading(true);
    try {
      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      let res;
      if (web3Key) {
        res = await axios.post("https://api.web3forms.com/submit", {
          access_key: web3Key,
          name,
          email,
          phone: number,
          message,
          subject: `New Contact Inquiry from ${name} - Sahil Infotech`,
          from_name: "Sahil Infotech Portfolio",
        });
      } else {
        res = await axios.post(
          "https://formsubmit.co/ajax/info@sahilinfotech.com",
          {
            name,
            email,
            phone: number,
            message,
            _subject: `New Contact Inquiry from ${name} - Sahil Infotech`,
            _template: "table",
            _captcha: "false",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      }

      if (res.data.success === true || res.data.success === "true") {
        toast.success("Message sent successfully! We will get back to you shortly.");
        ResetForm();
      } else if (
        res.data.message &&
        res.data.message.toLowerCase().includes("activation")
      ) {
        toast.success(
          "Form linked to info@sahilinfotech.com! Please check your Hostinger inbox and click 'Activate Form' once.",
          { duration: 6000 }
        );
        ResetForm();
      } else {
        toast.error(res.data.message || "Failed to submit. Please try again or email us directly at info@sahilinfotech.com");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please contact info@sahilinfotech.com directly.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
   <header>
      <div className="py-8 bg-slate-100 w-full  text-center px-2 mb-7">
        <h2 className="font-medium text-slate-800 text-3xl max-w-lg mx-auto mt-2">
          We Are Open to Talk
        </h2>
        <p className="font-medium py-3 text-gray-600 text-pretty max-w-2xl mx-auto">
          Let's start a conversation together, we'll create the solutions that
          drive your business forward.
        </p>
      </div>
      </header>
      <section id="contact" className=" bg-white mt-0 mb-0 px-10 py-10">
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Side - Contact Info */}
            <div className="flex-1 space-y-6  mt-5">
              <div className="flex gap-4 items-start">
                <MailOutlined className="text-blue-500 text-2xl" />
                <div>
                  <h3 className="font-semibold text-lg">Email Address</h3>
                  <a
                    href="mailto:info@sahilinfotech.com"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 block"
                  >
                    info@sahilinfotech.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <PhoneOutlined className="text-blue-500 text-2xl" />
                <div>
                  <h3 className="font-semibold text-lg">Phone Number</h3>
                  <a
                    href="tel:+919016738858"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 block"
                  >
                    +91 90167 38858
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <EnvironmentOutlined className="text-blue-500 text-2xl" />
                <div>
                  <h3 className="font-semibold text-lg ">Our Location</h3>
                  <a
                    href="https://maps.google.com/?q=207+The+Galleria+Kiran+Chowk+to+Yogi+Chowk+Road+Surat+Gujarat+395006+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 block"
                  >
                    207 The Galleria, Kiran Chowk to Yogi Chowk Road, Surat, Gujarat – 395006, India.
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1">
              <form
                className="flex flex-col text-sm text-slate-800 w-full"
                onSubmit={handleSubmit}
              >
                <div className="max-w-md w-full mx-auto">
                  <label className="font-medium">Full Name</label>
                  <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-full px-2 w-full outline-none bg-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <label className="font-medium">Email Address</label>
                  <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-full px-2 w-full outline-none bg-transparent"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="font-medium block mb-1">Contact Number</label>
                    <CountryPhoneInput
                      value={number}
                      onChange={({ fullNumber, isValid }) => {
                        setNumber(fullNumber);
                        setIsPhoneValid(isValid);
                      }}
                      required
                    />
                  </div>

                  <label className="font-medium">Message</label>
                  <textarea
                    style={{ borderRadius: "8px" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="Enter your message"
                    required
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 bg-[#091678] hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 w-full rounded-full transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <LoadingOutlined spin /> Sending...
                      </>
                    ) : (
                      "Submit Form"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-10 ">
            <h1 className="text-green-600 mb-2">Google Maps</h1>
            <h1 className="text-black">
              Found Us on <span className="text-green-600">Google</span> Maps
            </h1>
      
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.462032862647!2d72.88240737431141!3d21.213519481408998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f0e70d83f2d%3A0xc013dea3bcef1fe9!2sSahil%20Infotech!5e0!3m2!1sen!2sin!4v1757415125295!5m2!1sen!2sin"
              className="w-full h-[300px] rounded-lg border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
            </div>
          </div>
      </section>
    </>
  );
}
