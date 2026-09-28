import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTitle,
} from "flowbite-react";
import {
  HiLightBulb,
  HiOutlineClipboardList,
  HiCode,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { HiRocketLaunch } from "react-icons/hi2";

export function OurWorking() {
  const steps = [
    {
      icon: HiLightBulb,
      title: "Understand & Recommend",
      body: `We constantly aspire to break boundaries by understanding our clients' requirements
      and delivering tailored solutions with scalable, efficient, and innovative strategies.`,
    },
    {
      icon: HiOutlineClipboardList,
      title: "Strategy & Planning",
      body: `Understanding challenges organizations face, we equip clients with scalable,
      efficient, and innovative computing services through the best strategies.`,
    },
    {
      icon: HiCode,
      title: "Design & Develop",
      body: `Our skilled designers and developers handle UX/UI, API integrations,
      backend, and frontend development, adding value to your organization.`,
    },
    {
      icon: HiOutlineTrendingUp,
      title: "Marketing Recommendation",
      body: `We leverage top marketing strategies to maximize ROI by creating
      targeted solutions that drive growth.`,
    },
    {
      icon: HiRocketLaunch,
      title: "Testing & Launch",
      body: `Testing and validation are crucial. Our testers create scenarios,
      catch regressions, and produce automated tests.`,
    },
  ];

  return (
    <div  
      className="w-full px-6 py-10 mb-10"
      style={{ background: "#F7FBFD" }}
    >
      <div className="text-center mb-12" >
        <h2 className="text-4xl font-bold text-gray-900">
          Our Way of <span className="text-indigo-600">Working</span>
        </h2>
        <p className="font-medium py-5 text-gray-600 text-pretty max-w-2xl mx-auto">We implement result-driven strategies tailored to meet your business needs and goals. We offer solutions designed to empower your business and help you achieve your desired outcomes.</p>
      </div>

      <div
        className="grid gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        }}
      >
        {steps.map((step, index) => (
          <Timeline key={index} className={`${index === steps.length - 1 ? "border-l-0 sm:border-l" : "border-l"} border-gray-200 dark:border-gray-700`}>
            <TimelineItem>
              <TimelinePoint icon={step.icon} style={{width:"50px"}} />
              <TimelineContent>
                <TimelineTitle className="font-bold text-lg">
                  {step.title}
                </TimelineTitle>
                <TimelineBody className="text-gray-600 w-[calc(100%-3rem)]">
                  {step.body}
                </TimelineBody>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}
      </div>
    </div>
  );
}
