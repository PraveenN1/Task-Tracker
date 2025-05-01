import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TasksOverview from './TasksOverview';

const Sidebar = () => {
  const [value] = useState(new Date());
  return (
    <div className='h-full p-3 bg-white  
    border-gray-100 rounded-md shadow-sm sm:w-[20rem]'>
        <div className='w-full  border-gray-200 rounded-md'>
            <div className='rounded-lg'>
            <Calendar value={value} className=""/>
            </div>
        </div>
        <TasksOverview/>
    </div>
  )
}



export default Sidebar