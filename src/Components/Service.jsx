import React, { useEffect, useState } from "react";
import {
  SiFigma,
  SiCanva,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiHtml5,
  SiCss3,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import { OrbitingCircles } from "@/Components/magicui/orbiting-circles";

export default function Service() {
  const [sizes, setSizes] = useState({
    outerIconSize: 40,
    middleIconSize: 30,
    innerIconSize: 20,
    outerRadius: 240,
    middleRadius: 160,
    innerRadius: 90,
    containerHeight: 560,
  });

  useEffect(() => {
    function updateSizes() {
      const width = window.innerWidth;
      if (width < 640) {
        setSizes({
          outerIconSize: 25,
          middleIconSize: 18,
          innerIconSize: 12,
          outerRadius: 120,
          middleRadius: 80,
          innerRadius: 45,
          containerHeight: 300,
        });
      } else if (width < 1024) {
        setSizes({
          outerIconSize: 35,
          middleIconSize: 25,
          innerIconSize: 15,
          outerRadius: 180,
          middleRadius: 120,
          innerRadius: 70,
          containerHeight: 450,
        });
      } else {
        setSizes({
          outerIconSize: 40,
          middleIconSize: 30,
          innerIconSize: 20,
          outerRadius: 240,
          middleRadius: 160,
          innerRadius: 90,
          containerHeight: 560,
        });
      }
    }

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const designIcons = [
    <SiFigma key="figma" size={sizes.outerIconSize} color="#F24E1E" />,
    <SiCanva key="canva" size={sizes.outerIconSize} color="#00C4CC" />,
    <SiAdobephotoshop key="ps" size={sizes.outerIconSize} color="#31A8FF" />,
    <SiAdobeillustrator key="ai" size={sizes.outerIconSize} color="#FF9A00" />,
  ];

  const frontendIcons = [
    <SiHtml5 key="html" size={sizes.middleIconSize} color="#E34F26" />,
    <SiCss3 key="css" size={sizes.middleIconSize} color="#1572B6" />,
    <SiReact key="react" size={sizes.middleIconSize} color="#61DAFB" />,
    <SiJavascript key="js" size={sizes.middleIconSize} color="#F7DF1E" />,
    <SiTypescript key="ts" size={sizes.middleIconSize} color="#3178C6" />,
    <SiTailwindcss key="tw" size={sizes.middleIconSize} color="#38B2AC" />,
  ];

  const backendIcons = [
    <SiNodedotjs key="node" size={sizes.innerIconSize} color="#339933" />,
    <SiExpress key="express" size={sizes.innerIconSize} color="#000000" />,
    <SiDjango key="django" size={sizes.innerIconSize} color="#092E20" />,
    <SiFlask key="flask" size={sizes.innerIconSize} color="#000000" />,
    <FaJava key="java" size={sizes.innerIconSize} color="#007396" />,
  ];

  return (
    <>
    <div className="w-full overflow-x-auto px-6 py-10">
      <div className="text-center mb-12 mt-6" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-900">
          Technologies Driving Our {""}
          <span className="text-[#091678]">Solutions</span>
        </h2>
      </div>
      <div
        className="relative flex w-full flex-col items-center justify-center overflow-hidden"
        style={{ height: sizes.containerHeight }}
      >
        {/* Outer: Design tools */}
        <OrbitingCircles iconSize={sizes.outerIconSize} radius={sizes.outerRadius} speed={1.2}>
          {designIcons}
        </OrbitingCircles>

        {/* Middle: Frontend */}
        <OrbitingCircles
          iconSize={sizes.middleIconSize}
          radius={sizes.middleRadius}
          reverse
          speed={1.6}
        >
          {frontendIcons}
        </OrbitingCircles>

        {/* Inner: Backend */}
        <OrbitingCircles iconSize={sizes.innerIconSize} radius={sizes.innerRadius} speed={2.2}>
          {backendIcons}
        </OrbitingCircles>
      </div>
      </div>
    </>
  );
}
