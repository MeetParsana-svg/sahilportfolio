import React, { useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "@/context/ProjectContext";
import { Typography, Descriptions, Tag, Breadcrumb, Card } from "antd";
import { HomeOutlined, AppstoreOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import MobileProjectDetailed from "../Components/MobileProjectDetailed";
import WebProjectDetailed from "../Components/WebProjectDetailed";

const { Title, Paragraph } = Typography;

const ProjectDetailed = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const Project = getProjectById(id);
  const isMobile = useMediaQuery({ maxWidth: 500 }); // ✅ detect small screens

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const returnUrl =
    location.state?.from ||
    (sessionStorage.getItem("last_works_search")
      ? `/works${sessionStorage.getItem("last_works_search")}`
      : "/works");

  const handleBack = () => {
    if (window.history.length > 1 && location.state?.from) {
      navigate(-1);
    } else {
      navigate(returnUrl);
    }
  };

  if (!Project) {
    return <div className="text-center py-20 text-xl font-medium">Project not Found</div>;
  }

  const cat = (Project.category || "").trim().toLowerCase();

  // ✅ 1. Render Mobile Project Layout if category matches
  if (cat === "mobile app development") {
    return <MobileProjectDetailed project={Project} returnUrl={returnUrl} onBack={handleBack} />;
  }

  // ✅ 2. Render the NEW Premium UI for Custom Web Solutions & Shopify
  if (cat === "custom web solution" || cat === "shopify") {
    return <WebProjectDetailed project={Project} returnUrl={returnUrl} onBack={handleBack} />;
  }

  // ✅ 3. Default Simple Layout for all other project types (Web development, etc.)
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px 16px",
      }}
    >
      {/* Breadcrumb and Back Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
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
                <Link to={returnUrl}>
                  <AppstoreOutlined /> Works
                </Link>
              ),
            },
            { title: "Works Details" },
          ]}
        />
        <button
          onClick={handleBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            backgroundColor: "#fff",
            color: "#374151",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
            e.currentTarget.style.borderColor = "#4f46e5";
            e.currentTarget.style.color = "#4f46e5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.borderColor = "#d9d9d9";
            e.currentTarget.style.color = "#374151";
          }}
        >
          <ArrowLeftOutlined /> Back
        </button>
      </div>

      {/* Title */}
      <Title level={2} style={{ marginBottom: 16, textAlign: "left" }}>
        {Project.title}
      </Title>

      {/* Cover Image */}
      <img
        src={Project.coverImage}
        alt={Project.title}
        width="100%"
        style={{
          borderRadius: "12px",
          objectFit: "cover",
          marginBottom: 24,
        }}
      />

      {/* Description */}
      <Paragraph
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          marginBottom: 24,
          textAlign: "justify",
        }}
      >
        {Project.description
          ?.replace(/\s*,\s*/g, ",")
          ?.replace(/\s+/g, " ")
          ?.trim()}
      </Paragraph>

      {/* Work Info */}
      {isMobile ? (
        // ✅ Mobile Layout (Cards)
        <div className="space-y-3">
          <Card
            title="Client Name"
            headStyle={{ backgroundColor: "#c3ddfd", fontWeight: "bold" }}
          >
            {Project.client || Project.title || "N/A"}
          </Card>
          {Project.link && Project.link !== "#" && (
            <Card
              title="Website"
              headStyle={{ backgroundColor: "#c3ddfd", fontWeight: "bold" }}
            >
              <a
                href={Project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1890ff", wordBreak: "break-all" }}
              >
                {Project.link}
              </a>
            </Card>
          )}
          <Card
            title="Duration"
            headStyle={{ backgroundColor: "#c3ddfd", fontWeight: "bold" }}
          >
            {Project.duration}
          </Card>
          <Card
            title="Tech Stack"
            headStyle={{ backgroundColor: "#c3ddfd", fontWeight: "bold" }}
          >
            {Project.tags?.map((tag, idx) => (
              <Tag color="blue" key={idx}>
                {tag}
              </Tag>
            ))}
          </Card>
          <Card
            title="Key Features"
            headStyle={{ backgroundColor: "#c3ddfd", fontWeight: "bold" }}
          >
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {Project.keyfeatures?.map((item, idx) => (
                <li key={idx}>
                  {idx + 1}. {item}
                </li>
              ))}
            </ul>
          </Card>
          {Project.impactdeliverd && Project.impactdeliverd.length > 0 && (
            <Card
              title="Impact Delivered"
              headStyle={{ backgroundColor: "#c3ddfd", fontWeight: "bold" }}
            >
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {Project.impactdeliverd.map((item, idx) => (
                  <li key={idx}>
                    {idx + 1}. {item}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      ) : (
        // ✅ Desktop Layout (AntD Descriptions Table)
        <Descriptions
          title="Work Info"
          bordered
          column={1}
          size="default"
          labelStyle={{
            fontWeight: "bold",
            width: "200px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          <Descriptions.Item label="Client Name">
            {Project.client || Project.title || "N/A"}
          </Descriptions.Item>
          {Project.link && Project.link !== "#" && (
            <Descriptions.Item label="Website">
              <a
                href={Project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1890ff", wordBreak: "break-all" }}
              >
                {Project.link}
              </a>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Duration">
            {Project.duration}
          </Descriptions.Item>
          <Descriptions.Item label="Tech Stack">
            {Project.tags?.map((tag, idx) => (
              <Tag color="blue" key={idx}>
                {tag}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Key Features">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {Project.keyfeatures?.map((item, idx) => (
                <li key={idx}>
                  {idx + 1}. {item}
                </li>
              ))}
            </ul>
          </Descriptions.Item>
          {Project.impactdeliverd && Project.impactdeliverd.length > 0 && (
            <Descriptions.Item label="Impact Delivered">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {Project.impactdeliverd.map((item, idx) => (
                  <li key={idx}>
                    {idx + 1}. {item}
                  </li>
                ))}
              </ul>
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </div>
  );
};

export default ProjectDetailed;
