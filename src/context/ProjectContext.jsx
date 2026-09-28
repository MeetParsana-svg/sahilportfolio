import React, { createContext, useContext, useState, useEffect } from "react";
import { project as defaultProjects } from "@/assets/assets";

const STORAGE_KEY = "sahil_infotech_projects_v2";

const STANDARD_CATEGORIES = [
  "Web Development",
  "Mobile App Development",
  "Custom Web Solution",
  "Shopify",
  ".Net Development",
  "Chat Solution",
];

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse saved projects from localStorage", e);
    }
    return defaultProjects;
  });

  // Keep localStorage updated whenever projects state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error("Failed to save projects to localStorage", e);
    }
  }, [projects]);

  // Derived unique categories
  const categories = React.useMemo(() => {
    const catsSet = new Set(STANDARD_CATEGORIES);
    projects.forEach((p) => {
      if (p.category && p.category.trim()) {
        catsSet.add(p.category.trim());
      }
    });
    return Array.from(catsSet);
  }, [projects]);

  // Add new project
  const addProject = (projectData) => {
    // Generate next unique numeric ID
    const maxId = projects.reduce((max, p) => {
      const num = Number(p.id);
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newId = maxId + 1;

    const newProject = {
      ...projectData,
      id: newId,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  // Update existing project
  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (String(p.id) === String(id)) {
          return {
            ...p,
            ...updatedFields,
            id: p.id, // preserve ID
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      })
    );
  };

  // Delete project
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  // Reset to original dataset from assets
  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setProjects(defaultProjects);
  };

  // Find project by ID
  const getProjectById = (id) => {
    return projects.find((p) => String(p.id) === String(id));
  };

  // Find all projects in category
  const getProjectsByCategory = (cat) => {
    if (!cat || cat === "All") return projects;
    return projects.filter(
      (p) => p.category?.toLowerCase() === cat.toLowerCase()
    );
  };

  // Detect fields & template from an existing project or category
  const detectCategorySchema = (cat) => {
    const matching = projects.filter(
      (p) => p.category?.toLowerCase() === cat?.toLowerCase()
    );
    const sample = matching[0] || projects[0] || {};
    
    // Extract common tags in this category
    const tagCount = {};
    matching.forEach((p) => {
      (p.tags || []).forEach((t) => {
        tagCount[t] = (tagCount[t] || 0) + 1;
      });
    });
    const popularTags = Object.keys(tagCount)
      .sort((a, b) => tagCount[b] - tagCount[a])
      .slice(0, 10);

    return {
      category: cat,
      projectCount: matching.length,
      sampleProject: sample,
      availableFields: Object.keys(sample),
      popularTags,
    };
  };

  // Export data as JSON file
  const exportProjectsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio_projects_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import data from JSON
  const importProjectsJSON = (importedList) => {
    if (Array.isArray(importedList) && importedList.length > 0) {
      setProjects(importedList);
      return true;
    }
    return false;
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        categories,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults,
        getProjectById,
        getProjectsByCategory,
        detectCategorySchema,
        exportProjectsJSON,
        importProjectsJSON,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
