import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb, Tag, Typography } from "antd";
import { HomeOutlined, AppstoreOutlined, CheckCircleOutlined, GlobalOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const WebProjectDetailed = ({ project, returnUrl, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const challengesData = project?.challenges || [];
  const solutionsData = project?.solutions || [];
  const statsData = project?.stats || [];
  const resultsToShow = project?.results || [];

  const effectiveReturnUrl =
    returnUrl ||
    location.state?.from ||
    (sessionStorage.getItem("last_works_search")
      ? `/works${sessionStorage.getItem("last_works_search")}`
      : "/works");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1 && location.state?.from) {
      navigate(-1);
    } else {
      navigate(effectiveReturnUrl);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-800">
      {/* Breadcrumb and Back */}
      <div className="flex justify-between items-center mb-8">
        <Breadcrumb
          items={[
            { title: <Link to="/"><HomeOutlined /> Home</Link> },
            { title: <Link to={effectiveReturnUrl}><AppstoreOutlined /> Works</Link> },
            { title: "Works Details" },
          ]}
        />
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 hover:border-blue-500 font-medium text-sm transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeftOutlined /> Back
        </button>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
        
        {/* Left Column: Info */}
        <div className="space-y-8">
          <div>
            <Title level={1} className="!text-[#0B132B] !font-bold !mb-4 !text-4xl md:!text-5xl">
              {project?.title}
            </Title>
            <Paragraph className="text-gray-600 text-lg leading-relaxed">
              {project?.description}
            </Paragraph>
            {project?.link && project.link !== "#" && (
              <div className="pt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1890ff] hover:!bg-[#096dd9] text-white font-semibold shadow-md transition-colors"
                >
                  <GlobalOutlined /> Visit Live Website
                </a>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Client Name</Text>
              <Text className="text-gray-700 font-medium">{project?.client || project?.title}</Text>
            </div>

            {project?.industry && (
              <div>
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Industry</Text>
                <Text className="text-gray-700">{project.industry}</Text>
              </div>
            )}

            {project?.developer && (
              <div>
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Developer</Text>
                <Text className="text-gray-700">{project.developer}</Text>
              </div>
            )}

            {project?.type && (
              <div>
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Type</Text>
                <Text className="text-gray-700">{project.type}</Text>
              </div>
            )}

            {project?.region && (
              <div>
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Region</Text>
                <Text className="text-gray-700">{project.region}</Text>
              </div>
            )}

            {project?.price && (
              <div>
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Price</Text>
                <Text className="text-gray-700">{project.price}</Text>
              </div>
            )}

            {project?.duration && (
              <div>
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Timeline</Text>
                <Text className="text-gray-700">{project.duration}</Text>
              </div>
            )}

            <div>
              <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Platform</Text>
              <Text className="text-gray-700">{project?.platform || "Website"}</Text>
            </div>

            {project?.link && project.link !== "#" && (
              <div className="col-span-2 md:col-span-3">
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Website</Text>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline break-all inline-flex items-center gap-1.5"
                >
                  <GlobalOutlined /> {project.link}
                </a>
              </div>
            )}

            {(project?.technology?.length > 0 || project?.tags?.length > 0) && (
              <div className="col-span-2 md:col-span-3">
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Technology & Tags</Text>
                <div className="flex flex-wrap gap-2">
                  {(project?.technology || project?.tags || []).map((tag, idx) => (
                    <Tag key={idx} className="m-0 rounded-full bg-gray-100 border-gray-200 text-gray-700 px-3 py-1">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            
            {project?.purpose && (
              <div className="col-span-2 md:col-span-3">
                <Text className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Purpose</Text>
                <Text className="text-gray-700">{project.purpose}</Text>
              </div>
            )}
          </div>

          {/* Key Features */}
          {project?.keyfeatures && project.keyfeatures.length > 0 && (
            <div>
              <Title level={4} className="!text-[#0B132B] !mb-4">Key Features</Title>
              <ul className="space-y-3">
                {project.keyfeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Impact Delivered */}
          {project?.impactdeliverd && project.impactdeliverd.length > 0 && (
            <div>
              <Title level={4} className="!text-[#0B132B] !mb-4">Impact Delivered</Title>
              <ul className="space-y-3">
                {project.impactdeliverd.map((impact, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircleOutlined className="text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Image & Stats */}
        <div className="relative pt-4 lg:pt-0">
          <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100">
            <img 
              src={project?.coverImage || "https://res.cloudinary.com/dwzp4udnk/image/upload/v1755170845/industrial_mhbbvi.png"} 
              alt={project?.title || "Project Preview"} 
              className="w-full h-auto object-cover min-h-[350px]"
            />
          </div>
          
          {/* Floating Stats Card */}
          {statsData.length > 0 && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-6 z-10 flex justify-between items-center text-center">
              {statsData.map((stat, idx) => (
                <div key={idx} className="flex-1">
                  <div className={`text-xl md:text-2xl font-bold ${stat.color || 'text-gray-800'}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Challenges & Solutions Section */}
      {(challengesData.length > 0 || solutionsData.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-32">
          {/* Challenges */}
          {challengesData.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="12" cy="12" r="3" strokeWidth="2" fill="currentColor" />
                  </svg>
                </div>
                <Title level={3} className="!text-[#0B132B] !m-0">Challenges</Title>
              </div>
              
              <div className="space-y-4">
                {challengesData.map((item, idx) => (
                  <div key={idx} className="bg-[#FFF5F5] border border-red-100 rounded-xl p-5">
                    <div className="text-sm font-bold text-red-800 mb-1">{item.title}</div>
                    <div className="text-red-600">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solutions */}
          {solutionsData.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <Title level={3} className="!text-[#0B132B] !m-0">Solutions</Title>
              </div>
              
              <div className="space-y-4">
                {solutionsData.map((item, idx) => (
                  <div key={idx} className="bg-[#F0FDF4] border border-green-100 rounded-xl p-5">
                    <div className="text-sm font-bold text-green-800 mb-1">{item.title}</div>
                    <div className="text-green-700">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Outstanding Results Section */}
      {resultsToShow.length > 0 && (
        <div className="mt-32 mb-20 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 mb-4">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <Title level={2} className="!text-[#0B132B] !font-bold !mb-4">Outstanding Results</Title>
          <Paragraph className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
            The success metrics speak for themselves - delivering measurable business impact
          </Paragraph>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resultsToShow.map((result, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
                <div className="text-3xl font-bold text-[#D9534F] mb-3">{result.value}</div>
                <div className="text-sm text-gray-500">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default WebProjectDetailed;
