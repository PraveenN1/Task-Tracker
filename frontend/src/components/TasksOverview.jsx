import axios from 'axios';
import { BadgeCheck, Hourglass, StickyNote, RefreshCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const TasksOverview = () => {
  const [todoTasks, setTodoTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks/tasks-overview", {
        withCredentials: true,
      });
      setTodoTasks(response.data.todoTasks);
      setInProgressTasks(response.data.inProgressTasks);
      setDoneTasks(response.data.doneTasks);
    } catch (error) {
      console.error("Failed to fetch task overview:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Tasks Overview</h1>
        <button
          onClick={getTasks}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-700 transition"
        >
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 justify-between bg-red-50 rounded-xl shadow-sm hover:shadow-md transition">
          <StickyNote className="text-red-500 w-6 h-6 mb-2" />
          <span className="text-sm text-gray-600">Todo</span>
          <span className="text-lg font-semibold text-red-600">{todoTasks}</span>
        </div>

        <div className="flex flex-col items-center p-4 justify-between bg-yellow-50 rounded-xl shadow-sm hover:shadow-md transition">
          <Hourglass className="text-yellow-500 w-6 h-6 mb-2" />
          <span className="text-sm text-gray-600 text-center">In Progress</span>
          <span className="text-lg font-semibold text-yellow-600">{inProgressTasks}</span>
        </div>

        <div className="flex flex-col items-center p-4 justify-between bg-green-50 rounded-xl shadow-sm hover:shadow-md transition">
          <BadgeCheck className="text-green-500 w-6 h-6 mb-2" />
          <span className="text-sm text-gray-600">Done</span>
          <span className="text-lg font-semibold text-green-600">{doneTasks}</span>
        </div>
      </div>
    </div>
  );
};

export default TasksOverview;
