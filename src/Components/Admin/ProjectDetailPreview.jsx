import React from "react";
import { Tag, Typography, Rate, Card } from "antd";
import {
  GlobalOutlined,
  CheckCircleOutlined,
  AndroidFilled,
  AppleFilled,
  DownloadOutlined,
  StarFilled,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export const ProjectDetailPreview = ({ project }) => {
  if (!project) return null;

  const isMobile =
    project.category?.toLowerCase() === "mobile app development";
  const isWebDetailed =
    project.category?.toLowerCase() === "custom web solution" ||
    project.category?.toLowerCase() === "shopify";

  const fallbackCover =
    "https://res.cloudinary.com/dwzp4udnk/image/upload/v1755170845/industrial_mhbbvi.png";

  // 1. Mobile App Detailed Preview
  if (isMobile) {
    return (
      <div className="bg-white rounded-xl p-4 md:p-6 text-gray-800 max-w-4xl mx-auto shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-gray-100">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border border-gray-100 flex-shrink-0 bg-gray-50">
            <img
              src={project.coverImage || fallbackCover}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = fallbackCover;
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                {project.category}
              </span>
              {project.duration && (
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                  {project.duration}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {project.title || "Untitled Mobile App"}
            </h1>
            <p className="text-gray-500 font-medium text-sm mb-4">
              Client: {project.client || "Self"}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              {project.rating && (
                <div className="flex items-center gap-1 font-semibold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg">
                  <StarFilled /> {project.rating} / 5.0
                </div>
              )}
              {project.downloads && (
                <div className="flex items-center gap-1 font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  <DownloadOutlined /> {project.downloads} Downloads
                </div>
              )}
              {project.version && (
                <div className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700">
                  v{project.version}
                </div>
              )}
              {project.size && (
                <div className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700">
                  {project.size}
                </div>
              )}
            </div>

            {/* Store Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              {project.iosLink && (
                <a
                  href={project.iosLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800"
                >
                  <AppleFilled className="text-base" /> App Store
                </a>
              )}
              {(project.playStoreLink || project.androidLink) && (
                <a
                  href={project.playStoreLink || project.androidLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                >
                  <AndroidFilled className="text-base" /> Google Play
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Screenshots Gallery */}
        {project.images && project.images.length > 0 ? (
          <div className="py-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span>App Screenshots</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  {project.images.length} Screenshots Added
                </span>
              </h3>
              <span className="text-xs text-gray-400">Scroll horizontally to view all</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="w-40 h-72 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-gray-800/10 shadow-lg relative group bg-black"
                >
                  <img
                    src={img}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = fallbackCover;
                    }}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                    Screen #{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 border-b border-gray-100 text-xs text-gray-400 italic">
            No screenshots added for this app yet.
          </div>
        )}

        {/* Description */}
        <div className="py-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            About the App
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        {/* Key Features & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          {project.keyfeatures && project.keyfeatures.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider text-indigo-950">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.keyfeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircleOutlined className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.impactdeliverd && project.impactdeliverd.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider text-indigo-950">
                Impact Delivered
              </h4>
              <ul className="space-y-2">
                {project.impactdeliverd.map((imp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircleOutlined className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, idx) => (
                <Tag
                  key={idx}
                  className="rounded-full px-3 py-1 bg-gray-100 border-none text-gray-700 text-xs font-medium"
                >
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Custom Web Solution / Shopify Layout Preview
  if (isWebDetailed) {
    return (
      <div className="bg-white rounded-xl p-4 md:p-6 text-gray-800 max-w-4xl mx-auto shadow-sm border border-gray-100 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 inline-block mb-3">
              {project.category}
            </span>
            <h1 className="text-3xl font-extrabold text-[#0B132B] mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {project.description}
            </p>
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-sm"
              >
                <GlobalOutlined /> Visit Live Website
              </a>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 text-sm">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase">
                  Client
                </span>
                <span className="font-semibold text-gray-800">
                  {project.client || project.title}
                </span>
              </div>
              {project.industry && (
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase">
                    Industry
                  </span>
                  <span className="font-medium text-gray-700">
                    {project.industry}
                  </span>
                </div>
              )}
              {project.platform && (
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase">
                    Platform
                  </span>
                  <span className="font-medium text-gray-700">
                    {project.platform}
                  </span>
                </div>
              )}
              {project.duration && (
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase">
                    Duration
                  </span>
                  <span className="font-medium text-gray-700">
                    {project.duration}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src={project.coverImage || fallbackCover}
                alt={project.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = fallbackCover;
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
            {project.stats.map((st, i) => (
              <div key={i} className="text-center">
                <div
                  className={`text-2xl font-bold ${
                    st.color || "text-indigo-600"
                  }`}
                >
                  {st.value}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Challenges & Solutions */}
        {(project.challenges?.length > 0 || project.solutions?.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-4 border-t border-gray-100">
            {project.challenges && project.challenges.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider text-rose-800">
                  Key Challenges
                </h4>
                <div className="space-y-3">
                  {project.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-rose-50 border border-rose-100"
                    >
                      <h5 className="font-semibold text-rose-950 text-sm">
                        {ch.title}
                      </h5>
                      <p className="text-xs text-rose-800 mt-1">{ch.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.solutions && project.solutions.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider text-emerald-800">
                  Strategic Solutions
                </h4>
                <div className="space-y-3">
                  {project.solutions.map((sl, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-emerald-50 border border-emerald-100"
                    >
                      <h5 className="font-semibold text-emerald-950 text-sm">
                        {sl.title}
                      </h5>
                      <p className="text-xs text-emerald-800 mt-1">{sl.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Key Features & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {project.keyfeatures && project.keyfeatures.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.keyfeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircleOutlined className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.impactdeliverd && project.impactdeliverd.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider">
                Impact Delivered
              </h4>
              <ul className="space-y-2">
                {project.impactdeliverd.map((imp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircleOutlined className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tags */}
        {(project.tags || project.technology) && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {(project.tags || project.technology || []).map((t, idx) => (
                <Tag
                  key={idx}
                  className="rounded-full px-3 py-1 bg-gray-100 border-none text-gray-700 text-xs font-medium"
                >
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. Default General Layout Preview (Web Development, .Net, Chat, etc.)
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 text-gray-800 max-w-4xl mx-auto shadow-sm border border-gray-100">
      <div className="mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 inline-block mb-3">
          {project.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {project.title}
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Client: {project.client || "Client"}
        </p>
      </div>

      <div className="rounded-xl overflow-hidden shadow-md mb-6 max-h-[400px]">
        <img
          src={project.coverImage || fallbackCover}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = fallbackCover;
          }}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Overview</h3>
        <p className="text-gray-700 leading-relaxed">{project.description}</p>
      </div>

      {project.link && project.link !== "#" && (
        <div className="mb-6">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
          >
            <GlobalOutlined /> Visit Live Project
          </a>
        </div>
      )}

      {/* Features & Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {project.keyfeatures && project.keyfeatures.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider text-indigo-900">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.keyfeatures.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircleOutlined className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.impactdeliverd && project.impactdeliverd.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider text-indigo-900">
              Impact Delivered
            </h4>
            <ul className="space-y-2">
              {project.impactdeliverd.map((imp, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircleOutlined className="text-blue-500 mt-1 flex-shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t, idx) => (
              <Tag
                key={idx}
                className="rounded-full px-3 py-1 bg-gray-100 border-none text-gray-700 text-xs font-medium"
              >
                {t}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPreview;
