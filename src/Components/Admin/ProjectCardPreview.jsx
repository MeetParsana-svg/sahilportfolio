import React, { useState } from "react";
import { Card, Tag } from "antd";
import {
  GlobalOutlined,
  StarFilled,
  DownloadOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export const ProjectCardPreview = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobileApp =
    project?.category?.toLowerCase() === "mobile app development";

  const fallbackCover =
    "https://res.cloudinary.com/dwzp4udnk/image/upload/v1755170845/industrial_mhbbvi.png";
  const coverSrc = project?.coverImage || fallbackCover;

  if (isMobileApp) {
    return (
      <div className="w-full max-w-[380px] mx-auto transition-all">
        <Card
          hoverable
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            height: "100%",
            transition: "all 0.3s ease",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            boxShadow: isHovered
              ? "0 12px 24px rgba(0,0,0,0.12)"
              : "0 4px 12px rgba(0,0,0,0.06)",
            border: "1px solid #f0f0f0",
            backgroundColor: "#ffffff",
          }}
          bodyStyle={{ padding: "20px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "16px",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#f9fafb",
              }}
            >
              <img
                alt={project.title || "App Title"}
                src={coverSrc}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = fallbackCover;
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#1f2937",
                  lineHeight: "1.3",
                  wordBreak: "break-word",
                }}
              >
                {project.title || "Untitled Project"}
              </h3>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                {project.client || "Client Name"}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "13px",
                }}
              >
                {project.rating ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#fbbf24",
                      fontWeight: "600",
                    }}
                  >
                    <span style={{ marginRight: "4px" }}>{project.rating}</span>
                    <StarFilled style={{ fontSize: "12px" }} />
                  </div>
                ) : null}
                {project.downloads ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#6b7280",
                    }}
                  >
                    <DownloadOutlined style={{ marginRight: "4px" }} />
                    {project.downloads}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <p
              style={{
                fontSize: "14px",
                color: "#4b5563",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {project.description || "Project description will appear here..."}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "auto",
            }}
          >
            {(project.tags || []).slice(0, 3).map((tag, idx) => (
              <Tag
                key={idx}
                style={{
                  margin: 0,
                  borderRadius: "12px",
                  background: "#f3f4f6",
                  border: "none",
                  color: "#4b5563",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {tag}
              </Tag>
            ))}
            {(project.tags || []).length > 3 && (
              <Tag
                style={{
                  margin: 0,
                  borderRadius: "12px",
                  background: "#f3f4f6",
                  border: "none",
                  color: "#4b5563",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                +{(project.tags || []).length - 3}
              </Tag>
            )}
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "flex-end",
              opacity: isHovered ? 1 : 0.7,
              transform: isHovered ? "translateX(0)" : "translateX(-4px)",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                color: "#4f46e5",
                fontWeight: "600",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View Details <ArrowRightOutlined />
            </span>
          </div>
        </Card>
      </div>
    );
  }

  // Web & other cards
  return (
    <div className="w-full max-w-[380px] mx-auto transition-all">
      <Card
        hoverable
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: isHovered
            ? "0 12px 24px rgba(0,0,0,0.12)"
            : "0 4px 12px rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
          backgroundColor: "#ffffff",
        }}
        cover={
          <div
            style={{ position: "relative", width: "100%", overflow: "hidden" }}
          >
            <img
              alt={project.title || "Project Title"}
              src={coverSrc}
              onError={(e) => {
                e.target.src = fallbackCover;
              }}
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.3s ease",
                transform: isHovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            {project.link && project.link !== "#" && (
              <span
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "#4f46e5",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  opacity: isHovered ? 1 : 0.8,
                  transition: "all 0.3s ease",
                }}
                title="Live Website"
              >
                <GlobalOutlined style={{ fontSize: "18px" }} />
              </span>
            )}
          </div>
        }
        bodyStyle={{
          padding: "16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Meta
          title={
            <span
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                textAlign: "center",
                fontSize: "1.05rem",
                fontWeight: "600",
                display: "block",
                color: "#111827",
              }}
            >
              {project.title || "Untitled Project"}
            </span>
          }
          description={
            <div className="text-center mt-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                {project.category || "General"}
              </span>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ProjectCardPreview;
