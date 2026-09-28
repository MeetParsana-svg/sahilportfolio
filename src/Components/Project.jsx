import React from "react";
import { Card, Row, Col } from "antd";
import { useProjects } from "@/context/ProjectContext";
import { Link } from "react-router-dom";

import { GlobalOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Meta } = Card;

const ProjectCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      hoverable
      data-aos="fade-up"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
      cover={
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: "relative", width: "100%", overflow: "hidden" }}
        >
          <Link to={`/works/${item.id}`} style={{ display: "block", width: "100%" }}>
            <img
              alt={item.title}
              src={item.coverImage}
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.3s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </Link>
          {item.link && item.link !== "#" && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#4f46e5",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.3s ease",
                zIndex: 10,
              }}
              title="Visit Website"
            >
              <GlobalOutlined style={{ fontSize: "18px" }} />
            </a>
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
          <Link
            to={`/works/${item.id}`}
            style={{ color: "inherit", width: "100%", display: "block" }}
          >
            <span
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                textAlign: "center",
                fontSize: "1.05rem",
                fontWeight: "600",
              }}
            >
              {item.title}
            </span>
          </Link>
        }
      />
    </Card>
  );
};

const Project = () => {
  const { projects } = useProjects();
  const Limit = projects.slice(0, 6);

  return (
    <div style={{ padding: "40px" }}>
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-900">
          Featured <Link to={"/works"}><span className="text-indigo-600">Projects</span>
        </Link></h2>
        <p className="text-gray-600 mt-2">A selection of recent work.</p>
      </div>

      <Row gutter={[24, 24]}>
        {Limit.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <ProjectCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Project;
