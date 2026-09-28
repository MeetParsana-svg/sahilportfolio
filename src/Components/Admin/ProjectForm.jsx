import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Tag,
  Divider,
  Row,
  Col,
  Space,
  Upload,
  message,
  Card,
  Modal,
  Tooltip,
  Alert,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CopyOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  SaveOutlined,
  UndoOutlined,
  PictureOutlined,
  MobileOutlined,
  GlobalOutlined,
  ShoppingOutlined,
  CodeOutlined,
  AppstoreAddOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useProjects } from "@/context/ProjectContext";
import ProjectCardPreview from "./ProjectCardPreview";
import ProjectDetailPreview from "./ProjectDetailPreview";

const { TextArea } = Input;
const { Option } = Select;

const PRESET_BANNERS = [
  {
    name: "Modern SaaS",
    url: "https://res.cloudinary.com/dwzp4udnk/image/upload/v1755170845/industrial_mhbbvi.png",
  },
  {
    name: "Procure App",
    url: "/media/portfolio-banners/procure-icon.png",
  },
  {
    name: "Sangini App",
    url: "/media/portfolio-banners/sangini-icon.png",
  },
  {
    name: "Web Platform",
    url: "https://res.cloudinary.com/dwzp4udnk/image/upload/v1756390045/2_y1nb08.jpg",
  },
  {
    name: "Kidsty Store",
    url: "/media/portfolio-banners/kidstry.webp",
  },
];

// Presets for mobile app screenshots
const PRESET_MOBILE_SCREENSHOTS = [
  { name: "Procure Screen 1", url: "/media/app-screenshots/procure_1.png" },
  { name: "Procure Screen 2", url: "/media/app-screenshots/procure_2.png" },
  { name: "Sangini Screen 1", url: "/media/app-screenshots/sangini_1.png" },
  { name: "Sangini Screen 2", url: "/media/app-screenshots/sangini_2.png" },
  { name: "DailyBrief 1", url: "/media/app-screenshots/dailybrief_1.png" },
  { name: "DailyBrief 2", url: "/media/app-screenshots/dailybrief_2.png" },
  { name: "Cradlewise 1", url: "/media/app-screenshots/cradlewise_1.png" },
  { name: "Cradlewise 2", url: "/media/app-screenshots/cradlewise_2.png" },
];

const SUGGESTED_TAGS = [
  "React",
  "Node.js",
  "Tailwind CSS",
  "Next.js",
  "Flutter",
  "React Native",
  "WordPress",
  "Shopify",
  ".NET MVC",
  "SQL Server",
  "Python",
  "FastAPI",
  "TypeScript",
  "GraphQL",
  "AWS",
  "Firebase",
];

export const ProjectForm = ({
  initialValues = null,
  isEditing = false,
  onSaveSuccess,
  onCancel,
}) => {
  const { projects, categories, addProject, updateProject } = useProjects();
  const [form] = Form.useForm();

  // Category State
  const [selectedCategory, setSelectedCategory] = useState(
    initialValues?.category || "Mobile App Development"
  );
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [detectedSchemaInfo, setDetectedSchemaInfo] = useState(null);

  // Media & Screenshots State
  const [coverImage, setCoverImage] = useState(
    initialValues?.coverImage || PRESET_BANNERS[1].url
  );
  const [screenshots, setScreenshots] = useState(
    initialValues?.images || [
      "/media/app-screenshots/procure_1.png",
      "/media/app-screenshots/procure_2.png",
    ]
  );
  const [screenshotInput, setScreenshotInput] = useState("");

  // Tags & Features State
  const [tags, setTags] = useState(
    initialValues?.tags || ["React Native", "Mobile Friendly"]
  );
  const [tagInput, setTagInput] = useState("");

  const [keyfeatures, setKeyfeatures] = useState(
    initialValues?.keyfeatures || [
      "Intuitive and responsive mobile dashboard",
      "Real-time notifications and synchronized cloud data",
      "Seamless offline mode with secure local caching",
    ]
  );
  const [impactdeliverd, setImpactdeliverd] = useState(
    initialValues?.impactdeliverd || [
      "Increased user engagement and active daily sessions by 40%",
      "Reduced latency and streamlined end-to-end customer workflow",
    ]
  );

  // Web & Shopify Specific State
  const [challenges, setChallenges] = useState(
    initialValues?.challenges || [
      { title: "Mobile Experience", desc: "Creating a smooth touch experience on low-end devices" },
      { title: "Data Sync", desc: "Handling offline requests with background sync" },
    ]
  );
  const [solutions, setSolutions] = useState(
    initialValues?.solutions || [
      { title: "Optimized Architecture", desc: "Implemented native bridges and localized SQLite cache" },
      { title: "Background Sync", desc: "Engineered headless queuing system for unsent records" },
    ]
  );
  const [stats, setStats] = useState(
    initialValues?.stats || [
      { value: "50k+", label: "Active Downloads", color: "text-indigo-600" },
      { value: "4.9★", label: "App Store Rating", color: "text-amber-500" },
      { value: "99.9%", label: "Crash-free sessions", color: "text-emerald-600" },
    ]
  );

  // Live Preview State
  const [previewMode, setPreviewMode] = useState("none"); // 'none' | 'card' | 'detail'
  const [formValuesForPreview, setFormValuesForPreview] = useState({});

  // Detect which field sets should appear or disappear based on selectedCategory
  const normCategory = selectedCategory.trim().toLowerCase();
  const isMobile = normCategory === "mobile app development";
  const isWebDetailed =
    normCategory === "custom web solution" || normCategory === "shopify";
  const isStandardWeb = !isMobile && !isWebDetailed;

  // Auto-Detect Schema whenever category changes or triggered
  const triggerAutoDetectForCategory = (catName) => {
    const targetCat = catName || selectedCategory;
    const matching = projects.filter(
      (p) => p.category?.toLowerCase() === targetCat.toLowerCase()
    );

    if (matching.length > 0) {
      const sample = matching[0];
      const detectedFields = [];

      if (sample.coverImage) detectedFields.push("Cover Image / Icon");
      if (sample.images && sample.images.length > 0)
        detectedFields.push(`App Screenshots (${sample.images.length} in template)`);
      if (sample.rating || sample.downloads)
        detectedFields.push("App Rating & Downloads");
      if (sample.iosLink || sample.androidLink || sample.playStoreLink)
        detectedFields.push("App Store & Play Store Links");
      if (sample.link) detectedFields.push("Live Website Link");
      if (sample.challenges) detectedFields.push("Challenges & Solutions");
      if (sample.stats) detectedFields.push("Stats & Results");
      if (sample.keyfeatures)
        detectedFields.push(`Key Features (${sample.keyfeatures.length})`);
      if (sample.impactdeliverd)
        detectedFields.push(`Impact Delivered (${sample.impactdeliverd.length})`);
      if (sample.tags) detectedFields.push(`Tags (${sample.tags.join(", ")})`);

      setDetectedSchemaInfo({
        category: targetCat,
        sampleTitle: sample.title,
        detectedFields,
        count: matching.length,
      });

      // Update form defaults to match sample structure
      if (!initialValues) {
        if (sample.images && sample.images.length > 0) {
          setScreenshots(sample.images);
        }
        if (sample.tags && sample.tags.length > 0) {
          setTags(sample.tags);
        }
        if (sample.keyfeatures && sample.keyfeatures.length > 0) {
          setKeyfeatures(sample.keyfeatures);
        }
        if (sample.impactdeliverd && sample.impactdeliverd.length > 0) {
          setImpactdeliverd(sample.impactdeliverd);
        }
        if (sample.coverImage) {
          setCoverImage(sample.coverImage);
        }
        form.setFieldsValue({
          duration: sample.duration || "Completed",
          rating: sample.rating || (isMobile ? "4.9" : ""),
          downloads: sample.downloads || (isMobile ? "10k+" : ""),
          contentRating: sample.contentRating || (isMobile ? "4+" : ""),
          version: sample.version || (isMobile ? "1.0.0" : ""),
          size: sample.size || (isMobile ? "45M" : ""),
          iosLink: sample.iosLink || "",
          androidLink: sample.androidLink || sample.playStoreLink || "",
          link: sample.link || "",
          platform: sample.platform || "",
          industry: sample.industry || "",
        });
      }

      message.success(
        `Auto-detected ${detectedFields.length} options for ${targetCat} from existing projects!`
      );
    }
  };

  // Sync on initial load
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        androidLink: initialValues.androidLink || initialValues.playStoreLink || "",
      });
      setSelectedCategory(initialValues.category || "Mobile App Development");
      setCoverImage(initialValues.coverImage || PRESET_BANNERS[1].url);
      setTags(initialValues.tags || []);
      setKeyfeatures(initialValues.keyfeatures || []);
      setImpactdeliverd(initialValues.impactdeliverd || []);
      setChallenges(initialValues.challenges || []);
      setSolutions(initialValues.solutions || []);
      setStats(initialValues.stats || []);
      setScreenshots(initialValues.images || []);
    } else {
      triggerAutoDetectForCategory(selectedCategory);
    }
  }, [initialValues]);

  // Handle Category Change
  const handleCategoryChange = (val) => {
    if (val === "__custom__") {
      setIsCustomCategory(true);
      return;
    }
    setIsCustomCategory(false);
    setSelectedCategory(val);
    form.setFieldsValue({ category: val });
    triggerAutoDetectForCategory(val);
  };

  // Auto-Detect / Clone directly from an existing specific project
  const handleCloneFromExisting = (projectId) => {
    const existing = projects.find((p) => String(p.id) === String(projectId));
    if (!existing) return;

    setSelectedCategory(existing.category || "Web Development");
    setCoverImage(existing.coverImage || PRESET_BANNERS[0].url);
    setTags(existing.tags || []);
    setKeyfeatures(existing.keyfeatures || []);
    setImpactdeliverd(existing.impactdeliverd || []);
    setChallenges(existing.challenges || []);
    setSolutions(existing.solutions || []);
    setStats(existing.stats || []);
    setScreenshots(existing.images || []);

    form.setFieldsValue({
      category: existing.category,
      client: `${existing.client} (Clone)`,
      title: `${existing.title} (New)`,
      description: existing.description,
      duration: existing.duration || "Completed",
      link: existing.link || "",
      rating: existing.rating || "",
      downloads: existing.downloads || "",
      contentRating: existing.contentRating || "",
      version: existing.version || "",
      size: existing.size || "",
      iosLink: existing.iosLink || "",
      androidLink: existing.androidLink || existing.playStoreLink || "",
      industry: existing.industry || "",
      developer: existing.developer || "",
      type: existing.type || "",
      region: existing.region || "",
      price: existing.price || "",
      platform: existing.platform || "",
    });

    setDetectedSchemaInfo({
      category: existing.category,
      sampleTitle: existing.title,
      detectedFields: Object.keys(existing).filter(
        (k) => existing[k] && existing[k].length !== 0
      ),
      count: 1,
    });

    message.success(
      `Auto-detected all options & loaded ${existing.images?.length || 0} screenshots from "${existing.title}"!`
    );
  };

  // Cover Image Upload
  const handleCoverUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target.result);
      message.success("Cover image uploaded!");
    };
    reader.readAsDataURL(file);
    return false;
  };

  // MULTIPLE SCREENSHOTS HANDLERS
  // 1. Multiple Files Upload via device
  const handleMultipleScreenshotsUpload = (file, fileList) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setScreenshots((prev) => [...prev, e.target.result]);
    };
    reader.readAsDataURL(file);
    return false; // prevent POST
  };

  // 2. Add Single Screenshot via URL
  const handleAddScreenshotUrl = () => {
    if (screenshotInput.trim()) {
      setScreenshots([...screenshots, screenshotInput.trim()]);
      setScreenshotInput("");
      message.success("Screenshot added!");
    }
  };

  // 3. Remove Screenshot by Index
  const handleRemoveScreenshot = (idx) => {
    setScreenshots(screenshots.filter((_, i) => i !== idx));
    message.info("Screenshot removed.");
  };

  // 4. Quick Add Preset Screenshot
  const handleAddPresetScreenshot = (url) => {
    if (!screenshots.includes(url)) {
      setScreenshots([...screenshots, url]);
      message.success("Preset screenshot added!");
    } else {
      message.info("This screenshot is already added.");
    }
  };

  // 5. Clear All Screenshots
  const handleClearAllScreenshots = () => {
    setScreenshots([]);
    message.info("All screenshots cleared.");
  };

  // Tags Handlers
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Dynamic Features Handlers
  const addFeature = () => setKeyfeatures([...keyfeatures, ""]);
  const updateFeature = (idx, text) => {
    const arr = [...keyfeatures];
    arr[idx] = text;
    setKeyfeatures(arr);
  };
  const removeFeature = (idx) => {
    setKeyfeatures(keyfeatures.filter((_, i) => i !== idx));
  };

  // Dynamic Impact Handlers
  const addImpact = () => setImpactdeliverd([...impactdeliverd, ""]);
  const updateImpact = (idx, text) => {
    const arr = [...impactdeliverd];
    arr[idx] = text;
    setImpactdeliverd(arr);
  };
  const removeImpact = (idx) => {
    setImpactdeliverd(impactdeliverd.filter((_, i) => i !== idx));
  };

  // Challenges & Solutions Handlers
  const addChallenge = () =>
    setChallenges([...challenges, { title: "", desc: "" }]);
  const updateChallenge = (idx, field, val) => {
    const arr = [...challenges];
    arr[idx][field] = val;
    setChallenges(arr);
  };
  const removeChallenge = (idx) =>
    setChallenges(challenges.filter((_, i) => i !== idx));

  const addSolution = () =>
    setSolutions([...solutions, { title: "", desc: "" }]);
  const updateSolution = (idx, field, val) => {
    const arr = [...solutions];
    arr[idx][field] = val;
    setSolutions(arr);
  };
  const removeSolution = (idx) =>
    setSolutions(solutions.filter((_, i) => i !== idx));

  // Build Preview Object
  const buildCurrentProject = () => {
    const values = form.getFieldsValue();
    const finalCategory = isCustomCategory
      ? customCategoryName || "Custom Solution"
      : selectedCategory;

    return {
      id: initialValues?.id || 9999,
      ...values,
      category: finalCategory,
      coverImage: coverImage,
      tags: tags,
      images: screenshots,
      keyfeatures: keyfeatures.filter((f) => f && f.trim().length > 0),
      impactdeliverd: impactdeliverd.filter((im) => im && im.trim().length > 0),
      challenges: challenges.filter((c) => c.title || c.desc),
      solutions: solutions.filter((s) => s.title || s.desc),
      stats: stats.filter((st) => st.value || st.label),
      androidLink: values.androidLink || values.playStoreLink || "",
      playStoreLink: values.androidLink || values.playStoreLink || "",
    };
  };

  // Submit Handler
  const handleFinish = (values) => {
    const finalCategory = isCustomCategory
      ? customCategoryName || "Custom Solution"
      : selectedCategory;

    const payload = {
      ...values,
      category: finalCategory,
      coverImage,
      tags,
      images: screenshots,
      keyfeatures: keyfeatures.filter((f) => f && f.trim().length > 0),
      impactdeliverd: impactdeliverd.filter((im) => im && im.trim().length > 0),
      challenges: challenges.filter((c) => c.title || c.desc),
      solutions: solutions.filter((s) => s.title || s.desc),
      stats: stats.filter((st) => st.value || st.label),
      androidLink: values.androidLink || values.playStoreLink || "",
      playStoreLink: values.androidLink || values.playStoreLink || "",
    };

    if (isEditing && initialValues?.id) {
      updateProject(initialValues.id, payload);
      message.success(`Project "${payload.title}" updated successfully!`);
      if (onSaveSuccess) onSaveSuccess(payload, "update");
    } else {
      const created = addProject(payload);
      message.success(`Project "${created.title}" published successfully!`);
      if (onSaveSuccess) onSaveSuccess(created, "create");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ThunderboltOutlined className="text-indigo-600" />
            {isEditing ? `Edit Project: ${initialValues?.title}` : "Add New Project"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Dynamic schema: category-specific options appear & disappear automatically.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setFormValuesForPreview(buildCurrentProject());
              setPreviewMode("card");
            }}
            className="hover:border-indigo-500 hover:text-indigo-600 font-medium"
          >
            Preview Card
          </Button>

          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setFormValuesForPreview(buildCurrentProject());
              setPreviewMode("detail");
            }}
            className="hover:border-indigo-500 hover:text-indigo-600 font-medium"
          >
            Preview Full Detail Page
          </Button>

          {onCancel && (
            <Button onClick={onCancel} icon={<UndoOutlined />}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Auto-Detect & Template Banner */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-blue-50/80 to-purple-50/80 border border-indigo-100 rounded-2xl p-5 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <BulbOutlined className="text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-indigo-950">
                  Auto-Detect Schema & Options
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                  Active Category: {selectedCategory}
                </span>
              </div>
              <p className="text-xs text-indigo-900/80 mt-1 leading-relaxed">
                Options adapt automatically! Select a category to see relevant fields appear, or auto-detect from an existing project template.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="primary"
              icon={<ThunderboltOutlined />}
              onClick={() => triggerAutoDetectForCategory(selectedCategory)}
              className="!bg-indigo-600 hover:!bg-indigo-700 !font-semibold"
            >
              Auto-Detect Fields for {selectedCategory}
            </Button>

            <Select
              showSearch
              placeholder="Or clone from existing project..."
              className="min-w-[260px]"
              onChange={handleCloneFromExisting}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={projects.slice(0, 30).map((p) => ({
                value: p.id,
                label: `[${p.category}] ${p.title} (${p.client || "Client"})`,
              }))}
            />
          </div>
        </div>

        {/* Detected Fields Tags Cloud */}
        {detectedSchemaInfo && (
          <div className="mt-4 pt-3 border-t border-indigo-200/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-indigo-950">
              Auto-Detected Options ({detectedSchemaInfo.detectedFields?.length}):
            </span>
            {detectedSchemaInfo.detectedFields?.map((f, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-white/90 border border-indigo-200 text-indigo-800 font-medium shadow-xs"
              >
                ✓ {f}
              </span>
            ))}
          </div>
        )}
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          duration: "Completed",
          category: selectedCategory,
        }}
        className="space-y-6"
      >
        {/* SECTION 1: Category & Core Information */}
        <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-200/70">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              1. Category Selection & Core Info
            </h3>
            <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-1 rounded-lg">
              Dynamic Switcher
            </span>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-semibold text-gray-800">Project Category (Controls which options appear)</span>}
                required
              >
                <Select
                  value={isCustomCategory ? "__custom__" : selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full"
                  size="large"
                >
                  {categories.map((c) => (
                    <Option key={c} value={c}>
                      {c === "Mobile App Development" && "📱 "}
                      {c === "Web Development" && "🌐 "}
                      {c === "Custom Web Solution" && "⚙️ "}
                      {c === "Shopify" && "🛍️ "}
                      {c === ".Net Development" && "💻 "}
                      {c === "Chat Solution" && "💬 "}
                      {c}
                    </Option>
                  ))}
                  <Option value="__custom__">✨ + Add Custom Category...</Option>
                </Select>
              </Form.Item>

              {isCustomCategory && (
                <div className="mt-2">
                  <Input
                    placeholder="Enter custom category name (e.g. AI Automation, Web3 SaaS)..."
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                    size="large"
                  />
                </div>
              )}
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="client"
                label={<span className="font-semibold text-gray-800">Client / Company Name</span>}
                rules={[{ required: true, message: "Please enter client name" }]}
              >
                <Input placeholder="e.g. Procure, Sangini, Mangalmurti, Kidsty" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={16}>
              <Form.Item
                name="title"
                label={<span className="font-semibold text-gray-800">Project Title / Name</span>}
                rules={[{ required: true, message: "Please enter project title" }]}
              >
                <Input placeholder="e.g. Smart Logistics & Fleet Management Mobile App" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="duration"
                label={<span className="font-semibold text-gray-800">Duration / Timeline</span>}
              >
                <Input placeholder="e.g. Completed, 12 Weeks, 2.5 Months" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="description"
                label={<span className="font-semibold text-gray-800">Project Description</span>}
                rules={[{ required: true, message: "Please enter description" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Comprehensive description of the product, client goals, features, and key technical architecture..."
                />
              </Form.Item>
            </Col>

            {/* Live website link appears ONLY for Web / Shopify / Other (disappears for pure mobile app) */}
            {!isMobile && (
              <Col xs={24} md={12}>
                <Form.Item
                  name="link"
                  label={<span className="font-semibold text-gray-800">Live Website / Demo URL</span>}
                >
                  <Input placeholder="https://example.com" size="large" prefix={<GlobalOutlined />} />
                </Form.Item>
              </Col>
            )}
          </Row>
        </div>

        {/* SECTION 2: Cover Image / App Icon */}
        <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-200/70">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            2. {isMobile ? "App Icon / Primary Banner" : "Cover Banner Image"}
          </h3>

          <Row gutter={[20, 20]} items="center">
            <Col xs={24} md={14}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Image URL or Relative Path
                  </label>
                  <Input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Enter image URL..."
                    size="large"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Upload
                    beforeUpload={handleCoverUpload}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />}>Upload Image from Device</Button>
                  </Upload>
                  <span className="text-xs text-gray-400">or pick a sample:</span>
                </div>

                <div className="flex gap-2 flex-wrap pt-1">
                  {PRESET_BANNERS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCoverImage(preset.url)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                        coverImage === preset.url
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </Col>

            <Col xs={24} md={10}>
              <div className="border border-gray-200 rounded-xl p-3 bg-white flex flex-col items-center justify-center">
                <span className="text-xs text-gray-400 mb-2">
                  {isMobile ? "App Icon Preview" : "Cover Preview"}
                </span>
                <div
                  className={`rounded-xl overflow-hidden bg-gray-100 relative shadow-inner ${
                    isMobile ? "w-28 h-28" : "w-full h-36"
                  }`}
                >
                  <img
                    src={coverImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = PRESET_BANNERS[0].url;
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* SECTION 3: MOBILE APPS SPECIFIC - APPEARS ONLY FOR MOBILE APP DEVELOPMENT */}
        {isMobile && (
          <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <MobileOutlined className="text-emerald-600 text-lg" />
                3. Mobile App Specifications (Store Links & Metrics)
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Auto-Appeared for Mobile Apps
              </span>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="rating" label={<span className="font-semibold text-gray-800">Rating (0 - 5.0)</span>}>
                  <Input placeholder="e.g. 4.9" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="downloads" label={<span className="font-semibold text-gray-800">Total Downloads</span>}>
                  <Input placeholder="e.g. 50k+, 100k+" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="version" label={<span className="font-semibold text-gray-800">Version</span>}>
                  <Input placeholder="e.g. 2.1.0" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="size" label={<span className="font-semibold text-gray-800">App Size</span>}>
                  <Input placeholder="e.g. 42 MB" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="iosLink" label={<span className="font-semibold text-gray-800">Apple App Store URL</span>}>
                  <Input placeholder="https://apps.apple.com/..." size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="androidLink" label={<span className="font-semibold text-gray-800">Google Play Store URL</span>}>
                  <Input placeholder="https://play.google.com/store/apps/..." size="large" />
                </Form.Item>
              </Col>
            </Row>

            {/* MULTIPLE APP SCREENSHOTS MANAGER - ADD AND REMOVE */}
            <div className="mt-6 pt-6 border-t border-emerald-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <PictureOutlined className="text-emerald-700" />
                    App Screenshots Gallery ({screenshots.length} added)
                  </h4>
                  <p className="text-xs text-emerald-800/80 mt-0.5">
                    Add multiple screenshots by uploading files, typing image URLs, or picking preset screenshots.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Upload
                    multiple
                    beforeUpload={handleMultipleScreenshotsUpload}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />} className="!bg-emerald-600 !text-white hover:!bg-emerald-700 !border-none">
                      Upload Multiple Screenshots
                    </Button>
                  </Upload>

                  {screenshots.length > 0 && (
                    <Button danger onClick={handleClearAllScreenshots} icon={<DeleteOutlined />}>
                      Remove All
                    </Button>
                  )}
                </div>
              </div>

              {/* URL Add Input */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Paste image URL to add screenshot..."
                  value={screenshotInput}
                  onChange={(e) => setScreenshotInput(e.target.value)}
                  onPressEnter={(e) => {
                    e.preventDefault();
                    handleAddScreenshotUrl();
                  }}
                  size="large"
                />
                <Button
                  onClick={handleAddScreenshotUrl}
                  icon={<PlusOutlined />}
                  type="primary"
                  className="!bg-emerald-700"
                  size="large"
                >
                  Add Screenshot
                </Button>
              </div>

              {/* Quick Pick Presets */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-emerald-900 block mb-1.5">
                  Quick-add from portfolio app screenshots:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_MOBILE_SCREENSHOTS.map((ps, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddPresetScreenshot(ps.url)}
                      className="text-xs px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors font-medium shadow-xs"
                    >
                      + {ps.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screenshots Thumbnail List with Remove Buttons */}
              {screenshots.length === 0 ? (
                <div className="p-8 text-center bg-white/70 rounded-xl border border-dashed border-emerald-300">
                  <PictureOutlined className="text-3xl text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-emerald-900">
                    No Screenshots Added Yet
                  </p>
                  <p className="text-xs text-emerald-700">
                    Upload images from your device or use the presets above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {screenshots.map((src, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl overflow-hidden border border-emerald-200 bg-white shadow-sm flex flex-col"
                    >
                      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={src}
                          alt={`Screenshot ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.target.src = PRESET_BANNERS[0].url;
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveScreenshot(idx)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md opacity-90 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
                          title="Remove screenshot"
                        >
                          ✕
                        </button>
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="p-1.5 text-center">
                        <Button
                          size="small"
                          danger
                          type="link"
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveScreenshot(idx)}
                          className="!text-xs !p-0"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 4: CUSTOM WEB & SHOPIFY SPECIFIC - APPEARS ONLY FOR CUSTOM WEB & SHOPIFY */}
        {isWebDetailed && (
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-200 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                <ShoppingOutlined className="text-blue-600 text-lg" />
                3. Custom Web & Shopify Enterprise Specifications
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                Auto-Appeared for Web Solutions
              </span>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="platform" label={<span className="font-semibold text-gray-800">Platform</span>}>
                  <Input placeholder="e.g. Website, Shopify Plus" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="industry" label={<span className="font-semibold text-gray-800">Industry</span>}>
                  <Input placeholder="e.g. Healthcare, Fashion" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="type" label={<span className="font-semibold text-gray-800">Project Type</span>}>
                  <Input placeholder="e.g. B2B Portal, eCommerce" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="region" label={<span className="font-semibold text-gray-800">Region</span>}>
                  <Input placeholder="e.g. USA, UK, India" size="large" />
                </Form.Item>
              </Col>
            </Row>

            {/* Challenges & Solutions */}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3">
                Key Challenges & Solutions Pairs
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-rose-700">Challenges</span>
                    <Button size="small" type="dashed" onClick={addChallenge} icon={<PlusOutlined />}>
                      Add Challenge
                    </Button>
                  </div>
                  {challenges.map((c, idx) => (
                    <div key={idx} className="p-2.5 mb-2 bg-rose-50/70 rounded-xl border border-rose-100 flex flex-col gap-1.5">
                      <Input
                        placeholder="Challenge title"
                        value={c.title}
                        onChange={(e) => updateChallenge(idx, "title", e.target.value)}
                      />
                      <Input
                        placeholder="Challenge description"
                        value={c.desc}
                        onChange={(e) => updateChallenge(idx, "desc", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeChallenge(idx)}
                        className="text-red-500 hover:text-red-700 text-xs self-end"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-700">Strategic Solutions</span>
                    <Button size="small" type="dashed" onClick={addSolution} icon={<PlusOutlined />}>
                      Add Solution
                    </Button>
                  </div>
                  {solutions.map((s, idx) => (
                    <div key={idx} className="p-2.5 mb-2 bg-emerald-50/70 rounded-xl border border-emerald-100 flex flex-col gap-1.5">
                      <Input
                        placeholder="Solution title"
                        value={s.title}
                        onChange={(e) => updateSolution(idx, "title", e.target.value)}
                      />
                      <Input
                        placeholder="Solution description"
                        value={s.desc}
                        onChange={(e) => updateSolution(idx, "desc", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeSolution(idx)}
                        className="text-red-500 hover:text-red-700 text-xs self-end"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: KEY FEATURES & IMPACT DELIVERED (ALL CATEGORIES) */}
        <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-200/70">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            4. Key Features & Impact Delivered
          </h3>

          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800 text-sm">
                  Key Features ({keyfeatures.length})
                </span>
                <Button size="small" icon={<PlusOutlined />} onClick={addFeature}>
                  Add Feature
                </Button>
              </div>

              <div className="space-y-2">
                {keyfeatures.map((feat, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      value={feat}
                      onChange={(e) => updateFeature(idx, e.target.value)}
                      placeholder={`Feature ${idx + 1}...`}
                      size="middle"
                    />
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeFeature(idx)}
                    />
                  </div>
                ))}
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800 text-sm">
                  Impact Delivered ({impactdeliverd.length})
                </span>
                <Button size="small" icon={<PlusOutlined />} onClick={addImpact}>
                  Add Impact
                </Button>
              </div>

              <div className="space-y-2">
                {impactdeliverd.map((imp, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      value={imp}
                      onChange={(e) => updateImpact(idx, e.target.value)}
                      placeholder={`Impact ${idx + 1}...`}
                      size="middle"
                    />
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeImpact(idx)}
                    />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        {/* SECTION 6: TECHNOLOGY STACK & TAGS */}
        <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-200/70">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            5. Technology Stack & Tags
          </h3>

          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Add technology tag (e.g. React Native, Flutter, GraphQL, AWS)..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onPressEnter={(e) => {
                e.preventDefault();
                handleAddTag();
              }}
              className="max-w-md"
              size="large"
            />
            <Button onClick={handleAddTag} icon={<PlusOutlined />} size="large">
              Add Tag
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((t, idx) => (
              <Tag
                key={idx}
                closable
                onClose={() => handleRemoveTag(t)}
                className="px-3 py-1 rounded-full text-sm bg-indigo-50 border-indigo-200 text-indigo-700 font-medium"
              >
                {t}
              </Tag>
            ))}
          </div>

          <div>
            <span className="text-xs text-gray-400 block mb-1">Click to add quick tags:</span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((st, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTags([...tags, st])}
                  className="text-xs px-2.5 py-1 rounded-full bg-gray-200/80 hover:bg-indigo-100 hover:text-indigo-800 text-gray-700 transition-colors"
                >
                  + {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          {onCancel && (
            <Button onClick={onCancel} size="large">
              Cancel
            </Button>
          )}

          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            size="large"
            className="!bg-indigo-600 hover:!bg-indigo-700 !px-8 !font-semibold shadow-md"
          >
            {isEditing ? "Save & Update Project" : "Publish Project"}
          </Button>
        </div>
      </Form>

      {/* Modal for Card Preview */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-base font-bold text-gray-800">
            <EyeOutlined className="text-indigo-600" />
            Live Card Preview (How it appears in /works grid & homepage)
          </div>
        }
        open={previewMode === "card"}
        onCancel={() => setPreviewMode("none")}
        footer={[
          <Button key="close" onClick={() => setPreviewMode("none")}>
            Close Preview
          </Button>,
        ]}
        width={450}
        centered
      >
        <div className="py-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
          <ProjectCardPreview project={formValuesForPreview} />
        </div>
      </Modal>

      {/* Modal for Detail Page Preview */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-base font-bold text-gray-800">
            <EyeOutlined className="text-indigo-600" />
            Live Detail Page Preview ({formValuesForPreview?.images?.length || 0} Screenshots)
          </div>
        }
        open={previewMode === "detail"}
        onCancel={() => setPreviewMode("none")}
        footer={[
          <Button key="close" onClick={() => setPreviewMode("none")}>
            Close Preview
          </Button>,
        ]}
        width={950}
        centered
      >
        <div className="max-h-[75vh] overflow-y-auto py-2">
          <ProjectDetailPreview project={formValuesForPreview} />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectForm;
