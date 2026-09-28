import { Button } from "flowbite-react";
import { AiOutlineRise } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-[#F7FBFD] flex items-center py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-easing="ease-out-cubic"
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl mt-3 lg:text-5xl font-bold leading-tight">
            Transform Your Digital Journey with{" "}
            <span className="text-blue-600">Sahil Infotech</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-lg">
            We are a team of innovative developers at Sahil Infotech, building
            cutting-edge websites with the latest technologies to elevate your
            business.
          </p>
          <div>
            <Link to="/contact">
              <Button
                style={{ borderRadius: "12px", background: "#091678" }}
                pill
                className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg font-semibold"
              >
                Contact Us
                <AiOutlineRise size={20} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="200"
          className="flex justify-center"
        >
          <img
            src="https://media.istockphoto.com/id/1141421616/photo/this-office-space-is-filled-with-productivity.jpg?s=612x612&w=0&k=20&c=ka6rGPcVkhjC2cG-ICEQaE7mzufJ253bngJPahvBlCg="
            alt="Hero Image"
            className="rounded-2xl shadow-lg max-w-full md:max-w-sm lg:max-w-lg xl:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
