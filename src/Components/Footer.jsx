import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaFacebook, FaGlobe } from "react-icons/fa";
import { images } from "@/assets/assets";
const footer = () => {
  return (
    <div>
      <footer
        className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-white"
        style={{ backgroundColor: "#232930" }}
      >
        <div className="flex flex-col md:flex-row justify-between w-full gap-1 text-[14px]0 border-b border-gray-500/30 pb-6">
          <div className="md:max-w-96">
            <img
              src={images.logoTm}
              style={{
                filter: "brightness(0) invert(1)",
              }}
              width={157}
              height={40}
              alt="logo"
            />
            <p className="mt-6 text-sm">
              We are a team of innovative developers at Sahil Infotech, building
              cutting-edge websites with the latest technologies to elevate your
              business.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.linkedin.com/company/sahil-infotech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500 transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/sahil_infotech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/sahilinfotech06"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.sahilinfotech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                <FaGlobe size={20} />
              </a>
            </div>
          </div>
          <div className="flex-1 flex flex-col md:flex-row items-center md:items-start md:justify-end gap-1 text-[14px] md:gap-20 text-center md:text-left">
            <div>
              <h2 className="font-semibold mb-5">Company</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/works"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Contact-Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1.5 text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div>
              <h2 className="font-semibold mb-5">Our Services</h2>
              <ul className="text-sm space-y-2">
                {[
                  "UI/Ux Design",
                  "Web Design & Development",
                  "Full Stack Development",
                  "AI Services",
                  "DevOps Services",
                  "QA Testing",
                ].map((services, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    <a href="#">{services}</a>
                  </li>
                ))}
              </ul>
            </div> */}
            <div className="flex flex-col gap-[12px] text-white">
              <h4 className="font-semibold">Contact us at</h4>
              <a
                className="flex items-center gap-1.5 text-[14px] hover:text-blue-400 transition-colors duration-200"
                href="https://www.instagram.com/sahil_infotech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-[14px] h-[14px] invert-[.69]"
                  src="/media/icons/instagram.svg"
                  alt="instagram"
                />
                Instagram
              </a>
              <a
                className="flex items-center gap-1.5 text-[14px] hover:text-blue-400 transition-colors duration-200"
                href="https://www.threads.net/@sahil_infotech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-[14px] h-[14px] invert-[.69]"
                  src="/media/icons/threads.svg"
                  alt="thread"
                />
                Thread
              </a>
              {/* <a href="#" target="_blank" rel="noopener noreferrer">
            Upwork
          </a> */}
              <a
                className="flex items-center gap-1.5 text-[14px] hover:text-blue-400 transition-colors duration-200"
                href="https://www.facebook.com/sahilinfotech06/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-[14px] h-[14px] invert-[.69]"
                  src="/media/icons/facebook.svg"
                  alt="facebook"
                />
                Facebook
              </a>
              <a
                className="flex items-center gap-1.5 text-[14px] hover:text-blue-400 transition-colors duration-200"
                href="https://www.linkedin.com/company/sahil-infotech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-[14px] h-[14px] invert-[.69]"
                  src="/media/icons/linkedin.svg"
                  alt="linkedin"
                />
                Linkedin
              </a>
              <a
                className="flex items-center gap-1.5 text-[14px] hover:text-blue-400 transition-colors duration-200"
                href="https://x.com/sahilinfotech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  className="w-[14px] h-[14px] invert-[.69]"
                  src="/media/icons/x.svg"
                  alt="x"
                />
                Twitter
              </a>
            </div>
            <div>
              <h2 className="font-semibold mb-5">Get in touch</h2>
              <div className="text-sm space-y-2">
                <a
                  href="tel:+919016738858"
                  className="block hover:text-blue-400 transition-colors duration-300"
                  title="Call +91 90167 38858"
                >
                  +91 90167 38858
                </a>
                <a
                  href="mailto:info@sahilinfotech.com"
                  className="block hover:text-blue-400 transition-colors duration-300"
                  title="Email info@sahilinfotech.com"
                >
                  info@sahilinfotech.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-400 flex flex-wrap items-center justify-center gap-2">
          <span>
            Copyright 2024 ©{" "}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-blue-400 transition-colors duration-200 text-gray-200"
            >
              Sahil Infotech
            </Link>
            . All Right Reserved.
          </span>
          <span className="text-gray-600">|</span>
          <Link
            to="/admin"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Admin Portal
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default footer;
