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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Projects
      </h2>

      <ul className="space-y-3">
        {projects.map((project) => (
          <li
            key={project._id}
            className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <Folder className="text-blue-500" size={20} />
            <span className="text-gray-700 font-medium">{project.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
