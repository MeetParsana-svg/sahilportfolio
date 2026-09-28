import { React, useEffect, useState } from "react";
import { Card, Row, Col, Breadcrumb, Pagination, Tag, Input, Empty, Button } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  StarFilled,
  DownloadOutlined,
  AndroidOutlined,
  AppleOutlined,
  ArrowRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useProjects } from "@/context/ProjectContext";
const { Meta } = Card;

const ProjectCard = ({ item }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const isMobileApp = item.category === "Mobile App Development";
  const returnState = { from: `${location.pathname}${location.search}` };

  if (isMobileApp) {
    return (
      <Link to={`/works/${item.id}`} state={returnState} style={{ textDecoration: 'none' }}>
        <Card
          hoverable
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            height: "100%",
            transition: "all 0.3s ease",
            transform: isHovered ? "translateY(-5px)" : "translateY(0)",
            boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.1)" : "0 4px 12px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0",
          }}
          bodyStyle={{ padding: "20px" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "16px",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <img
                alt={item.title}
                src={item.coverImage}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                margin: "0 0 4px 0", 
                fontSize: "18px", 
                fontWeight: "700", 
                color: "#1f2937",
                lineHeight: "1.3",
               }}>
                {item.title}
              </h3>
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#6b7280" }}>
                {item.client}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
                {item.rating && (
                  <div style={{ display: "flex", alignItems: "center", color: "#fbbf24", fontWeight: "600" }}>
                    <span style={{ marginRight: "4px" }}>{item.rating}</span>
                    <StarFilled style={{ fontSize: "12px" }} />
                  </div>
                )}
                {item.downloads && (
                  <div style={{ display: "flex", alignItems: "center", color: "#6b7280" }}>
                    <DownloadOutlined style={{ marginRight: "4px" }} />
                    {item.downloads}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
             <p style={{ 
                fontSize: "14px", 
                color: "#4b5563", 
                display: "-webkit-box", 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: "vertical", 
                overflow: "hidden",
                margin: 0,
                lineHeight: "1.5"
              }}>
               {item.description}
             </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
            {item.tags?.slice(0, 3).map((tag, idx) => (
              <Tag 
                key={idx} 
                style={{ 
                  margin: 0, 
                  borderRadius: "12px", 
                  background: "#f3f4f6", 
                  border: "none", 
                  color: "#4b5563",
                  fontSize: "12px",
                  fontWeight: "500"
                }}
              >
                {tag}
              </Tag>
            ))}
             {item.tags?.length > 3 && (
                 <Tag 
                style={{ 
                  margin: 0, 
                  borderRadius: "12px", 
                  background: "#f3f4f6", 
                  border: "none", 
                  color: "#4b5563",
                   fontSize: "12px",
                  fontWeight: "500"
                }}
              >
                +{item.tags.length - 3}
              </Tag>
             )}
          </div>
           <div style={{ 
              marginTop: "16px", 
              display: "flex", 
              justifyContent: "flex-end",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(-10px)",
              transition: "all 0.3s ease"
            }}>
             <span style={{ color: "#4f46e5", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
               View Details <ArrowRightOutlined />
             </span>
           </div>
        </Card>
      </Link>
    );
  }

  return (
    <Card
      hoverable
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
          <Link to={`/works/${item.id}`} state={returnState} style={{ display: "block", width: "100%" }}>
            <img
              alt={item.title}
              src={item.coverImage}
              loading="lazy"
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
            state={returnState}
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

const ProjectPage = () => {
  const { projects, categories: dynamicCategories } = useProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const selectedCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(urlSearch);

  const pageParam = parseInt(searchParams.get("page"), 10);
  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const categories = [
    "All",
    ...(dynamicCategories || [
      "Web Development",
      "Mobile App Development",
      ".Net Development",
      "Chat Solution",
      "Custom Web Solution",
      "Shopify",
    ]),
  ];

  // Sync search input if URL changes (e.g. back navigation or clear)
  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounce search input into URL searchParams
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentInUrl = searchParams.get("search") || "";
      const trimmed = searchInput.trim();
      if (trimmed !== currentInUrl) {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          if (trimmed) {
            params.set("search", trimmed);
          } else {
            params.delete("search");
          }
          params.delete("page"); // reset pagination on search change
          return params;
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const cardPerPage = 6;
  const normalizedQuery = urlSearch.trim().toLowerCase();

  // Filter by category and search query
  const filterData = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const inTitle = p.title?.toLowerCase().includes(normalizedQuery);
    const inClient = p.client?.toLowerCase().includes(normalizedQuery);
    const inDescription = p.description?.toLowerCase().includes(normalizedQuery);
    const inTags = Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
    const inTech = Array.isArray(p.technology) && p.technology.some((t) => t.toLowerCase().includes(normalizedQuery));
    const inCategory = p.category?.toLowerCase().includes(normalizedQuery);

    return inTitle || inClient || inDescription || inTags || inTech || inCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filterData.length / cardPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * cardPerPage;
  const currentCards = filterData.slice(startIndex, startIndex + cardPerPage);

  const handlePageChange = (pageNumber) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (pageNumber > 1) {
        params.set("page", pageNumber.toString());
      } else {
        params.delete("page");
      }
      return params;
    });
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (cat, checked) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (checked && cat !== "All") {
        params.set("category", cat);
      } else {
        params.delete("category");
      }
      // reset pagination on category switch, preserving search
      params.delete("page");
      return params;
    });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearchParams(new URLSearchParams());
  };

  useEffect(() => {
    sessionStorage.setItem("last_works_search", location.search);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  return (
    <>
      <div style={{ padding: "24px", marginTop: "10px" }}>
        {/* Breadcrumb */}
        <Breadcrumb
          style={{ marginBottom: "16px" }}
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
                <Link to={`/works${location.search}`}>
                  <AppstoreOutlined /> Works
                </Link>
              ),
            },
            ...(selectedCategory !== "All" ? [{ title: selectedCategory }] : []),
            ...(urlSearch ? [{ title: `"${urlSearch}"` }] : []),
          ]}
        />

        {/* Top Header & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Our Works & Projects
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Explore our comprehensive portfolio of web and mobile solutions
            </p>
          </div>

          <div className="w-full sm:w-80 md:w-96">
            <Input
              size="large"
              placeholder="Search by title, client, tech..."
              prefix={<SearchOutlined className="text-gray-400 mr-1.5" />}
              allowClear
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="rounded-full shadow-sm hover:border-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Filters and Result Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-gray-100">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <Tag.CheckableTag
                key={cat}
                checked={selectedCategory === cat}
                onChange={(checked) => handleCategoryChange(cat, checked)}
                style={{
                  fontSize: "14px",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                {cat}
              </Tag.CheckableTag>
            ))}
          </div>

          <div className="text-xs md:text-sm text-gray-500 font-medium flex items-center gap-2">
            <span>
              <strong>{filterData.length}</strong> {filterData.length === 1 ? "project" : "projects"} found
            </span>
            {(urlSearch || selectedCategory !== "All") && (
              <button
                onClick={handleClearFilters}
                className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline text-xs ml-1"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Results / Empty state */}
        {filterData.length === 0 ? (
          <div className="py-20 text-center bg-gray-50/70 rounded-2xl border border-dashed border-gray-200 my-4">
            <Empty
              description={
                <div className="space-y-1">
                  <p className="text-gray-700 font-semibold text-base">No matching projects found</p>
                  <p className="text-gray-500 text-sm">
                    {urlSearch ? (
                      <>
                        No results for "<strong>{urlSearch}</strong>"
                        {selectedCategory !== "All" && ` in ${selectedCategory}`}.
                      </>
                    ) : (
                      `No projects found in ${selectedCategory}.`
                    )}
                  </p>
                </div>
              }
            >
              <Button
                type="primary"
                onClick={handleClearFilters}
                className="mt-3 bg-blue-600 hover:!bg-blue-700 rounded-full px-6"
              >
                Clear all filters
              </Button>
            </Empty>
          </div>
        ) : (
          <>
            {/* dynamic data */}
            <Row gutter={[24, 24]}>
              {currentCards.map((item, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <ProjectCard item={item} />
                </Col>
              ))}
            </Row>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="text-center mt-8 mb-5">
                <Pagination
                  align="end"
                  current={validCurrentPage}
                  pageSize={cardPerPage}
                  total={filterData.length}
                  onChange={handlePageChange}
                  showSizeChanger={false} // hides the page size dropdown
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProjectPage;
