import React from "react";
import { Button } from "flowbite-react";
import { AiOutlineRise } from "react-icons/ai";
import { Link } from "react-router-dom";
const AboutSection = () => {
  return (
    <>
      <section className=" flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4  mb-10 ">
        <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
          <img
            className="max-w-md w-full object-cover rounded-2xl mt-4"
            src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
            alt=""
          />
        </div>
        <div className="text-sm text-slate-600 max-w-lg">
          <h1 className="text-xl uppercase font-semibold text-slate-700">
            What we do?
          </h1>
          <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
          <p className="mt-8">
            Empowering businesses with innovative digital solutions that build
            meaningful connections and drive success.{" "}
          </p>
          <p className="mt-4">
            At Sahil Infotech, we specialize in delivering bespoke applications
            and websites designed to meet the evolving needs of modern
            businesses. Our expertise spans UI/UX design, web development,
            full-stack solutions, artificial intelligence, and DevOps, ensuring
            a comprehensive approach to every project.
          </p>
          <p className="mt-4">
            With a skilled team of professionals and extensive experience across
            diverse industries, we are committed to transforming your ideas into
            impactful digital experiences. At Sahil Infotech, we don’t just
            build solutions—we create value, foster innovation, and help
            businesses thrive in the digital era.
          </p>
        </div>
      </section>

      <section className="py-8 bg-slate-100 w-full  text-center px-2 mb-7">
        <p className="text-xl font-medium text-slate-600">
          Let’s work together!
        </p>
        <h2 className="font-medium text-slate-800 text-3xl max-w-lg mx-auto mt-2">
         Have A Project In-mind?
        </h2>
        <p className="font-medium py-3 text-gray-600 text-pretty max-w-2xl mx-auto">Book a 20-minute call to understand how Sahil Infotech works and get ready to accelerate your company.</p>
        <div className="flex items-center justify-center mt-4">
        <Link to="/contact">
          <Button
            style={{ borderRadius: "12px", background: "#091678" }}
            pill
            className=" gap-2 px-6 py-3 text-lg font-semibold"
          >
            Contact Us
            <AiOutlineRise size={20} />
          </Button>
         </Link>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
