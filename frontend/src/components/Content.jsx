import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Tasks from "./content/Tasks";
import Projects from "./content/Projects";
import axios from "axios";

const Content = () => {
  const [activeTab, setActiveTab] = useState("Tasks");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "", // for task creation
  });

  const [projects, setProjects] = useState([]);

  // Fetch projects for the dropdown when "Projects" tab is active
  useEffect(() => {
    if (activeTab === "Tasks") {
      const fetchProjects = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/projects");
          setProjects(response.data.projects); // Assuming response returns a list of projects
        } catch (error) {
          console.error("Failed to fetch projects:", error);
        }
      };
      fetchProjects();
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Tasks":
        return <Tasks />;
      case "Projects":
        return <Projects />;
      default:
        return null;
    }
  };

  const handleCreate = () => {
    setShowModal(true);
    setFormData({
      title: "",
      description: "",
      projectId: "",
    });
  };

  const handleClick = async (e) => {
    // e.preventDefault();

    try {
      if (activeTab === "Tasks") {
        const response = await axios.post(
          "http://localhost:3000/api/tasks",
          formData,
          { withCredentials: true }
        );
        // console.log("Task Created:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/projects/create-project",
          { title: formData.title },
          { withCredentials: true }
        );
        // console.log("Project Created:", response.data);
        
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error creating task/project:", error);
    }
  };

  return (
    <div className="bg-white h-full rounded-md shadow-sm">
      <div className="flex justify-between gap-3 p-3 pl-9 rounded-md bg-white shadow-sm">
        <div className="flex gap-3">
          {["Tasks", "Projects"].map((tab) => (
            <p
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium cursor-pointer rounded-full shadow transition duration-200
              ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-50 hover:to-blue-100 hover:text-blue-600"
              }`}
            >
              {tab}
            </p>
          ))}
        </div>
        <button
          className="mr-4 px-3 py-2 flex items-center bg-green-500 font-semibold rounded-full text-white gap-2"
          onClick={handleCreate}
        >
          <Plus size={18} /> Create
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">
              Create {activeTab === "Tasks" ? "Task" : "Project"}
            </h3>
            <form onSubmit={handleClick} className="space-y-3">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-sm"
                placeholder="Title"
                required
              />
              {activeTab === "Tasks" && (
                <>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded text-sm"
                    placeholder="Description"
                    rows={3}
                    required
                  />
                  <select
                    value={formData.projectId}
                    onChange={(e) =>
                      setFormData({ ...formData, projectId: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded text-sm"
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="p-5">{renderContent()}</div>
    </div>
  );
};

export default Content;
