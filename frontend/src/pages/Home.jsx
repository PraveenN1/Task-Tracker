import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Content from "../components/Content";
import {ShieldUser} from "lucide-react";
import useCurrentUser from "../hooks/useCurrentUser";

const Home = () => {
  const user=useCurrentUser();
  
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <div className="flex flex-col  gap-2">
      <p className='p-4 py-[19px] gap-2 text-2xl font-bold rounded-md bg-white shadow-sm flex justify-center items-center'>
             <ShieldUser/> {user || 'Guest'}
            </p>
        <Sidebar />
      </div>

      <div
        className="flex flex-col h-screen border-2 
    border-gray-100 gap-2 w-full "
      >
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Home;
