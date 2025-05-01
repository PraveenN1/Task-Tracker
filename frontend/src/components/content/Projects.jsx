import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Folder } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get("http://localhost:3000/api/projects");
      setProjects(response.data.projects);
    };
    getProjects();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Icon</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Created By</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Created At</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4"><Folder className="text-blue-500" size={20} /></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{project.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.createdAt.split('T')[0]}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.updatedAt.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
