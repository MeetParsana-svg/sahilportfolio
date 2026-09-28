import React, { useState } from "react";
import {
  Tabs,
  Input,
  Button,
  Tag,
  Popconfirm,
  message,
  Modal,
  Badge,
  Card,
  Row,
  Col,
  Statistic,
  Empty,
  Select,
  Tooltip,
} from "antd";
import {
  AppstoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  GlobalOutlined,
  LogoutOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
  ReloadOutlined,
  DiffOutlined,
  MobileOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useProjects } from "@/context/ProjectContext";
import AdminLogin from "./AdminLogin";
import ProjectForm from "@/Components/Admin/ProjectForm";
import ProjectCardPreview from "@/Components/Admin/ProjectCardPreview";
import ProjectDetailPreview from "@/Components/Admin/ProjectDetailPreview";
import { images } from "@/assets/assets";

export const AdminPortal = () => {
  const { isAuthenticated, adminUser, logout } = useAdminAuth();
  const {
    projects,
    categories,
    deleteProject,
    resetToDefaults,
    exportProjectsJSON,
    importProjectsJSON,
  } = useProjects();
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState("projects");

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Editing Project State
  const [editingProject, setEditingProject] = useState(null);

  // Preview Modal
  const [previewProject, setPreviewProject] = useState(null);
  const [previewType, setPreviewType] = useState("card"); // 'card' | 'detail'

  // Comparison State for "Check once how look like after adding see in older already added projects"
  const [compareOldId, setCompareOldId] = useState(projects[0]?.id || null);
  const [compareNewId, setCompareNewId] = useState(
    projects.find((p) => p.isCustom)?.id || projects[1]?.id || null
  );

  // If not logged in, show the Admin Login Screen
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Filtered projects for list
  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategoryFilter === "All" ||
      p.category?.toLowerCase() === selectedCategoryFilter.toLowerCase();
    if (!matchesCat) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const inTitle = p.title?.toLowerCase().includes(q);
    const inClient = p.client?.toLowerCase().includes(q);
    const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
    const inCat = p.category?.toLowerCase().includes(q);
    return inTitle || inClient || inTags || inCat;
  });

  // Handle Edit
  const handleStartEdit = (proj) => {
    setEditingProject(proj);
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Delete
  const handleDelete = (id, title) => {
    deleteProject(id);
    message.success(`Project "${title}" deleted.`);
  };

  // Import JSON Handler
  const handleJSONFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          importProjectsJSON(parsed);
          message.success(`Imported ${parsed.length} projects successfully!`);
        } else {
          message.error("Invalid JSON format. Expected an array of projects.");
        }
      } catch (err) {
        message.error("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const oldProject = projects.find((p) => String(p.id) === String(compareOldId));
  const newProject = projects.find((p) => String(p.id) === String(compareNewId));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans pb-20">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-gray-800 text-white px-4 md:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={images.logoTm}
                alt="Sahil Infotech"
                className="h-7 w-auto filter brightness-0 invert"
              />
            </Link>
            <span className="hidden sm:inline-block text-gray-500">|</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <SafetyOutlined /> Admin Console
            </span>
          </div>

          {/* User info & Quick Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-right hidden lg:block text-xs">
              <span className="text-gray-400">Logged in as: </span>
              <span className="font-semibold text-white">
                {adminUser?.email || "shubham@sangani.com"}
              </span>
            </div>

            <Link
              to="/works"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium transition-colors"
            >
              <GlobalOutlined /> View Live Works
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium transition-colors"
            >
              <HomeOutlined /> Main Website
            </Link>

            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={() => {
                logout();
                message.info("Signed out from Admin Portal");
              }}
              size="small"
              className="!text-rose-400 hover:!text-rose-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {/* Metric Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">Total Projects</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{projects.length}</div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">Web Dev</div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">
              {projects.filter((p) => p.category === "Web Development").length}
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">Mobile Apps</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {projects.filter((p) => p.category === "Mobile App Development").length}
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">Custom Web</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {projects.filter((p) => p.category === "Custom Web Solution").length}
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">Shopify</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {projects.filter((p) => p.category === "Shopify").length}
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">.NET & Other</div>
            <div className="text-2xl font-bold text-purple-600 mt-1">
              {
                projects.filter(
                  (p) =>
                    p.category === ".Net Development" ||
                    p.category === "Chat Solution"
                ).length
              }
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200 px-6 pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab("projects");
                  setEditingProject(null);
                }}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === "projects"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <AppstoreOutlined /> All Projects ({projects.length})
              </button>

              <button
                onClick={() => setActiveTab("add")}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === "add"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <PlusOutlined /> {editingProject ? "Edit Project" : "Add Project"}
              </button>

              <button
                onClick={() => setActiveTab("compare")}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === "compare"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <DiffOutlined /> Check & Compare with Older Projects
              </button>

              <button
                onClick={() => setActiveTab("backup")}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === "backup"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <ReloadOutlined /> Backup & Settings
              </button>
            </div>

            {activeTab === "projects" && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingProject(null);
                  setActiveTab("add");
                }}
                className="!bg-indigo-600 hover:!bg-indigo-700 !font-semibold mb-2"
              >
                Add New Project
              </Button>
            )}
          </div>
        </div>

        {/* TAB 1: ALL PROJECTS LIST & MANAGEMENT */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* Search and Category Filter Toolbar */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search projects by title, client, category, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  size="large"
                />
              </div>

              {/* Category selector pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryFilter("All")}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategoryFilter === "All"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All ({projects.length})
                </button>
                {categories.map((cat) => {
                  const count = projects.filter(
                    (p) => p.category?.toLowerCase() === cat.toLowerCase()
                  ).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                        selectedCategoryFilter === cat
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Cards / List */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80">
                <Empty description="No projects found matching your filter" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
                  >
                    {/* Thumbnail & Badges */}
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      <img
                        src={
                          item.coverImage ||
                          "https://res.cloudinary.com/dwzp4udnk/image/upload/v1755170845/industrial_mhbbvi.png"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://res.cloudinary.com/dwzp4udnk/image/upload/v1755170845/industrial_mhbbvi.png";
                        }}
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-900/80 backdrop-blur-md text-white">
                          #{item.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-600/90 backdrop-blur-md text-white">
                          {item.category}
                        </span>
                        {item.isCustom && (
                          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500 text-white">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">
                          Client: {item.client || "Self / Internal"}
                        </div>
                        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {(item.tags || []).slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {(item.tags || []).length > 3 && (
                            <span className="text-[11px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">
                              +{(item.tags || []).length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Tooltip title="Preview Card & Detail">
                            <Button
                              size="small"
                              icon={<EyeOutlined />}
                              onClick={() => {
                                setPreviewProject(item);
                                setPreviewType("card");
                              }}
                            >
                              Preview
                            </Button>
                          </Tooltip>

                          <Tooltip title="View Live on Website">
                            <Link to={`/works/${item.id}`} target="_blank">
                              <Button size="small" icon={<GlobalOutlined />}>
                                View
                              </Button>
                            </Link>
                          </Tooltip>
                        </div>

                        <div className="flex items-center gap-1">
                          <Tooltip title="Edit this project">
                            <Button
                              size="small"
                              type="primary"
                              icon={<EditOutlined />}
                              onClick={() => handleStartEdit(item)}
                              className="!bg-indigo-600"
                            >
                              Edit
                            </Button>
                          </Tooltip>

                          <Popconfirm
                            title="Delete this project?"
                            description="Are you sure you want to remove this project from the portfolio?"
                            onConfirm={() => handleDelete(item.id, item.title)}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                          >
                            <Button
                              size="small"
                              danger
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADD / EDIT PROJECT */}
        {activeTab === "add" && (
          <div className="space-y-4">
            <ProjectForm
              initialValues={editingProject}
              isEditing={!!editingProject}
              onSaveSuccess={(savedProject, mode) => {
                setActiveTab("projects");
                setEditingProject(null);
              }}
              onCancel={() => {
                setActiveTab("projects");
                setEditingProject(null);
              }}
            />
          </div>
        )}

        {/* TAB 3: CHECK & COMPARE WITH OLDER ALREADY ADDED PROJECTS */}
        {activeTab === "compare" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <DiffOutlined className="text-indigo-600" />
                Check & Compare with Older Already Added Projects
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Verify how newly added or edited projects match the styling, typography, and detail structure of the original portfolio projects.
              </p>

              <Row gutter={[24, 24]}>
                {/* Left: Older project selector */}
                <Col xs={24} md={12}>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                      1. Select Older Original Project
                    </label>
                    <Select
                      showSearch
                      className="w-full mb-4"
                      size="large"
                      value={compareOldId}
                      onChange={(val) => setCompareOldId(val)}
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      options={projects.map((p) => ({
                        value: p.id,
                        label: `[${p.category}] #${p.id} ${p.title} (${p.client || "Client"})`,
                      }))}
                    />

                    {oldProject && (
                      <div className="space-y-4">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Card View in /works:
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex justify-center">
                          <ProjectCardPreview project={oldProject} />
                        </div>

                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider pt-2">
                          Project Details Summary:
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 text-xs space-y-2">
                          <div>
                            <span className="font-bold text-gray-700">Category:</span>{" "}
                            {oldProject.category}
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Client:</span>{" "}
                            {oldProject.client}
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Features:</span>{" "}
                            {(oldProject.keyfeatures || []).length} key features
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Tags:</span>{" "}
                            {(oldProject.tags || []).join(", ")}
                          </div>
                          <div>
                            <Link
                              to={`/works/${oldProject.id}`}
                              target="_blank"
                              className="text-indigo-600 font-semibold inline-flex items-center gap-1"
                            >
                              Open Full Detail Page <ArrowRightOutlined />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>

                {/* Right: New / Compared project */}
                <Col xs={24} md={12}>
                  <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                    <label className="block text-xs font-bold text-indigo-900 uppercase mb-2">
                      2. Select New / Compared Project
                    </label>
                    <Select
                      showSearch
                      className="w-full mb-4"
                      size="large"
                      value={compareNewId}
                      onChange={(val) => setCompareNewId(val)}
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      options={projects.map((p) => ({
                        value: p.id,
                        label: `${p.isCustom ? "★ [NEW] " : ""}[${p.category}] #${p.id} ${p.title}`,
                      }))}
                    />

                    {newProject && (
                      <div className="space-y-4">
                        <div className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
                          Card View in /works:
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-sm flex justify-center">
                          <ProjectCardPreview project={newProject} />
                        </div>

                        <div className="text-xs font-semibold text-indigo-900 uppercase tracking-wider pt-2">
                          Project Details Summary:
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-indigo-200 text-xs space-y-2">
                          <div>
                            <span className="font-bold text-gray-700">Category:</span>{" "}
                            {newProject.category}
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Client:</span>{" "}
                            {newProject.client}
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Features:</span>{" "}
                            {(newProject.keyfeatures || []).length} key features
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Tags:</span>{" "}
                            {(newProject.tags || []).join(", ")}
                          </div>
                          <div>
                            <Link
                              to={`/works/${newProject.id}`}
                              target="_blank"
                              className="text-indigo-600 font-semibold inline-flex items-center gap-1"
                            >
                              Open Full Detail Page <ArrowRightOutlined />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {/* TAB 4: BACKUP & DATA SETTINGS */}
        {activeTab === "backup" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Data Persistence & Backups
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                All changes, additions, and edits are automatically saved in the browser storage. You can also export the full catalog to JSON or restore original defaults.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Export Catalog to JSON
                    </h4>
                    <p className="text-xs text-gray-500">
                      Download all {projects.length} projects as a backup JSON file.
                    </p>
                  </div>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={exportProjectsJSON}
                    className="hover:border-indigo-600 hover:text-indigo-600"
                  >
                    Export JSON
                  </Button>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Import Projects from JSON
                    </h4>
                    <p className="text-xs text-gray-500">
                      Restore or batch import projects from an existing JSON file.
                    </p>
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-gray-300 hover:border-indigo-600 text-sm font-medium transition-colors bg-white">
                    <UploadOutlined /> Import File
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleJSONFileImport}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-rose-950 text-sm">
                      Reset to Factory Default Data
                    </h4>
                    <p className="text-xs text-rose-800">
                      Reverts all modifications and resets the catalog to the original initial static projects.
                    </p>
                  </div>
                  <Popconfirm
                    title="Reset all projects?"
                    description="This will erase all custom additions and edits and restore default projects. Continue?"
                    onConfirm={() => {
                      resetToDefaults();
                      message.success("Projects reset to original defaults!");
                    }}
                    okText="Yes, Reset"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                  >
                    <Button danger icon={<ReloadOutlined />}>
                      Reset All
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Preview Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-base font-bold text-gray-800">
            <EyeOutlined className="text-indigo-600" />
            {previewType === "card"
              ? `Card Preview: ${previewProject?.title}`
              : `Full Detail Preview: ${previewProject?.title}`}
          </div>
        }
        open={!!previewProject}
        onCancel={() => setPreviewProject(null)}
        footer={[
          <Button
            key="toggle"
            onClick={() =>
              setPreviewType(previewType === "card" ? "detail" : "card")
            }
          >
            Switch to {previewType === "card" ? "Detail View" : "Card View"}
          </Button>,
          <Link
            key="live"
            to={`/works/${previewProject?.id}`}
            target="_blank"
            className="inline-block ml-2"
          >
            <Button type="primary" className="!bg-indigo-600">
              Open Live Page
            </Button>
          </Link>,
          <Button key="close" onClick={() => setPreviewProject(null)}>
            Close
          </Button>,
        ]}
        width={previewType === "card" ? 450 : 950}
        centered
      >
        <div className="py-4 max-h-[75vh] overflow-y-auto">
          {previewType === "card" ? (
            <div className="flex justify-center p-4 bg-gray-50 rounded-xl">
              <ProjectCardPreview project={previewProject} />
            </div>
          ) : (
            <ProjectDetailPreview project={previewProject} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AdminPortal;
