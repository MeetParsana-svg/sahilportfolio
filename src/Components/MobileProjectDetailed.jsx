import React, { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Typography, Card, Button, Tag, Breadcrumb, Carousel, Rate } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  AndroidFilled,
  AppleFilled,
  GlobalOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const { Title, Paragraph, Text } = Typography;

const MobileProjectDetailed = ({ project, returnUrl, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const carouselRef = useRef(null);

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

  const next = () => {
    carouselRef.current.next();
  };
  const previous = () => {
    carouselRef.current.prev();
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px 16px",
      }}
    >
      {/* Breadcrumb and Back */}
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined /> Home
                </Link>
              ),
            },
            {
              title: (
                <Link to={effectiveReturnUrl}>
                  <AppstoreOutlined /> Works
                </Link>
              ),
            },
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

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
        <div className="flex-shrink-0">
          <img
            src={project.coverImage}
            alt={project.title}
            style={{
              width: "128px",
              height: "128px",
              borderRadius: "24px",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </div>
        <div className="flex-grow text-center md:text-left space-y-2">
          <Title level={2} style={{ margin: 0 }}>
            {project.title}
          </Title>
          <Text className="block text-green-600 font-medium text-lg">
            {project.client || "Sahil Infotech"}
          </Text>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 text-sm">
            {project.rating && (
              <div className="flex items-center gap-1">
                <span className="font-bold">{project.rating}</span>
                <Rate disabled defaultValue={parseFloat(project.rating)} style={{ fontSize: 14 }} />

              </div>
            )}
            {project.reviews && (
              <div className="border-l pl-4 border-gray-300">
                <span className="block font-bold">{project.reviews}</span>
                <span className="text-xs text-gray-500">Reviews</span>
              </div>
            )}
            {project.downloads && (
              <div className="border-l pl-4 border-gray-300">
                <span className="block font-bold">{project.downloads}</span>
                <span className="text-xs text-gray-500">Downloads</span>
              </div>
            )}
            <div className="border-l pl-4 border-gray-300">
              <span className="block font-bold">{project.contentRating || "3+"}</span>
              <span className="text-xs text-gray-500">Rated for {project.contentRating || "3+"}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center md:justify-start pt-4">
            {project.androidLink && (
              <Button
                type="primary"
                icon={<AndroidFilled />}
                href={project.androidLink}
                target="_blank"
                className="bg-green-600 hover:!bg-green-700 border-none h-10 px-6 rounded-full flex items-center shadow-md font-semibold"
              >
                Install
              </Button>
            )}
            {project.iosLink && (
              <Button
                type="primary"
                icon={<AppleFilled />}
                href={project.iosLink}
                target="_blank"
                className="bg-black hover:!bg-gray-800 border-none h-10 px-6 rounded-full flex items-center shadow-md font-semibold"
              >
                Get
              </Button>
            )}
            {!project.androidLink && !project.iosLink && project.link && (
              <Button
                type="primary"
                icon={<GlobalOutlined />}
                href={project.link}
                target="_blank"
                className="bg-blue-600 hover:!bg-blue-700 border-none h-10 px-6 rounded-full flex items-center shadow-md font-semibold"
              >
                Visit Website
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      {project.images && project.images.length > 0 && (
        <div className="mb-10 relative group">
          <div className="flex justify-between items-center mb-4 px-1">
            <Title level={4} style={{ margin: 0 }}>Preview</Title>
            {project.images.length > 1 && (
              <div className="flex gap-2">
                <Button shape="circle" icon={<LeftOutlined />} onClick={previous} />
                <Button shape="circle" icon={<RightOutlined />} onClick={next} />
              </div>
            )}
          </div>

          {project.images.length === 1 ? (
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
              <img
                src={project.images[0]}
                alt="App Preview"
                className="w-full h-auto object-contain"
                style={{ maxHeight: "600px" }}
              />
            </div>
          ) : (
            <Carousel
              ref={carouselRef}
              arrows={false}
              infinite={true}
              autoplay={true}
              autoplaySpeed={3000}
              slidesToShow={isMobile ? 1.2 : 4}
              slidesToScroll={1}
              dots={false}
              variableWidth={false}
              className="pb-8 -mx-2"
            >
              {project.images.map((img, idx) => (
                <div key={idx} className="px-2">
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 h-[400px] flex items-center justify-center">
                    <img
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* About Section */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <Title level={4} style={{ margin: 0 }}>About this app</Title>
              {/* <Button type="link" icon={<RightOutlined />} style={{ padding: 0 }} /> */}
            </div>

            {project?.purpose && (
              <Paragraph className="text-sm text-gray-800 font-medium mb-4 italic bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                {project.purpose}
              </Paragraph>
            )}

            <Paragraph className="text-sm text-gray-600 leading-relaxed text-justify">
              {project.description}
            </Paragraph>
          </section>

          {/* Key Features */}
          {project?.keyfeatures && project.keyfeatures.length > 0 && (
            <section>
              <Title level={4} className="mb-4">Key Features</Title>
              <div className="grid grid-cols-1 gap-3">
                {project.keyfeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="min-w-[6px] h-[6px] rounded-full bg-gray-400 mt-2.5" />
                    <Text className="text-gray-700">{feature}</Text>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Impact Delivered */}
          {project?.impactdeliverd && project.impactdeliverd.length > 0 && (
            <section>
              <Title level={4} className="mb-4">Impact Delivered</Title>
              <div className="grid grid-cols-1 gap-3">
                {project.impactdeliverd.map((impact, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-2.5" />
                    <Text className="text-gray-700">{impact}</Text>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {/* Tech Stack */}
          {project?.technology?.length > 0 && (
            <Card title="Technology Stack" size="small" bordered={false} className="shadow-none">
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                {project.technology.map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card title="Tags" size="small" bordered={false} className="shadow-none">
            <div className="flex flex-wrap gap-2">
              {project?.tags?.map((tag, idx) => (
                <Tag key={idx} className="px-3 py-1 text-sm rounded-full m-0 bg-gray-100 border border-gray-200 text-gray-600">
                  {tag}
                </Tag>
              ))}
            </div>
          </Card>
          {/* Additional Info */}
          <Card title="App Info" size="small" bordered={false} className="shadow-none">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <Text type="secondary">Client</Text>
                <Text className="text-right w-1/2 font-medium">{project.client || project.title}</Text>
              </div>
              {project?.developer && (
                <div className="flex justify-between">
                  <Text type="secondary">Developer</Text>
                  <Text className="text-right w-1/2">{project.developer}</Text>
                </div>
              )}
              {project?.platform && (
                <div className="flex justify-between">
                  <Text type="secondary">Platform</Text>
                  <Text className="text-right w-1/2">{project.platform}</Text>
                </div>
              )}
              {project?.region && (
                <div className="flex justify-between">
                  <Text type="secondary">Region</Text>
                  <Text>{project.region}</Text>
                </div>
              )}
              {project?.price && (
                <div className="flex justify-between">
                  <Text type="secondary">Price</Text>
                  <Text>{project.price}</Text>
                </div>
              )}
              {project.updatedOn && (
                <div className="flex justify-between">
                  <Text type="secondary">Updated on</Text>
                  <Text>{project.updatedOn}</Text>
                </div>
              )}
              {project.size && (
                <div className="flex justify-between">
                  <Text type="secondary">Size</Text>
                  <Text>{project.size}</Text>
                </div>
              )}
              {project.version && (
                <div className="flex justify-between">
                  <Text type="secondary">Version</Text>
                  <Text>{project.version}</Text>
                </div>
              )}
              <div className="flex justify-between">
                <Text type="secondary">Downloads</Text>
                <Text>{project.downloads || "100+"}</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobileProjectDetailed;
