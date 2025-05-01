import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BadgeCheck,
  Hourglass,
  StickyNote,
  Pencil,
  Trash2,
} from "lucide-react";

const statusIcon = {
  Todo: <StickyNote size={16} />,
  "In-Progress": <Hourglass size={16} />,
  Done: <BadgeCheck size={16} />,
};

const statusColors = {
  Todo: "text-red-500",
  "In-Progress": "text-yellow-500",
  Done: "text-green-600",
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filterProject, setFilterProject] = useState("All");
  const [sortOption, setSortOption] = useState("None");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
      withCredentials: true,
    });
    fetchTasks();
  };

  const handleUpdateClick = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:3000/api/tasks/${currentTask._id}`,
      {
        title: currentTask.title,
        description: currentTask.description,
        status: currentTask.status,
        selectedId: currentTask._id,
      },
      {
        withCredentials: true,
      }
    );
    setShowModal(false);
    fetchTasks();
  };

  const uniqueProjects = ["All", ...new Set(tasks.map((t) => t.project?.title || "N/A"))];

  const filteredTasks = tasks.filter((task) =>
    filterProject === "All" ? true : (task.project?.title || "N/A") === filterProject
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortOption === "Status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="p-4 mx-auto">
      {/* Filter and Sort Dropdowns */}
      <div className="flex justify-end gap-4 mb-4">
        <div>
          <label className="text-sm font-medium mr-2">Filter by Project:</label>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            {uniqueProjects.map((project, idx) => (
              <option key={idx} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mr-2">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="None">None</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Status">Status</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full ">
          <thead className="bg-blue-500 text-white text-md ">
            <tr>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Project</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Completed</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            {sortedTasks.map((task) => (
              <tr
                key={task._id}
                className="bg-white hover:bg-gray-50 shadow-sm"
              >
                <td className="px-4 py-3 flex items-center gap-2 rounded-l-lg">
                  <span className={statusColors[task.status]}>
                    {statusIcon[task.status]}
                  </span>
                  {task.status}
                </td>
                <td className="px-4 py-3">{task.title}</td>
                <td className="px-4 py-3">{task.description}</td>
                <td className="px-4 py-3">{task.project?.title || "N/A"}</td>
                <td className="px-4 py-3">{task.createdAt?.split("T")[0]}</td>
                <td className="px-4 py-3">
                  {task.completedAt ? task.completedAt.split("T")[0] : "Undone"}
                </td>
                <td className="px-4 py-3 flex gap-3 rounded-r-lg">
                  <button
                    onClick={() => handleUpdateClick(task)}
                    className="text-blue-600 hover:bg-blue-100 px-2 rounded-md flex justify-center items-center"
                  >
                    <Pencil size={16} />
                    <p className="px-3">Update</p>
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:bg-red-100 px-2 rounded-md flex justify-center items-center"
                  >
                    <Trash2 size={16} />
                    <p>Delete</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Update Task</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                value={currentTask.title}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, title: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-sm"
                placeholder="Title"
                required
              />
              <textarea
                value={currentTask.description}
                onChange={(e) =>
                  setCurrentTask({
                    ...currentTask,
                    description: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded text-sm"
                placeholder="Description"
                rows={3}
                required
              />
              <select
                value={currentTask.status}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, status: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-sm"
              >
                <option value="Todo">Todo</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Done">Done</option>
              </select>
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
