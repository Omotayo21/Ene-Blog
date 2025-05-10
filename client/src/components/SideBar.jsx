import React from "react";
import { X } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col fixed top-0 left-0 w-screen h-screen bg-gray-200 dark:bg-gray-800 bg-opacity-80 z-30 items-center justify-center"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <button onClick={closeSidebar} className="absolute top-4 right-4">
        <X size={24} />
      </button>
      <div className="flex flex-col items-center gap-y-4 font-semibold font-serif">
        <p
          onClick={() => {
            navigate("/");
            closeSidebar();
          }}
          className="text-eco-green hover:underline
          
          cursor-pointer"
        >
          Home
        </p>
        <p
          onClick={() => {
            navigate("/about");
            closeSidebar();
          }}
          className="text-eco-green hover:underline
            
          cursor-pointer"
        >
          About
        </p>
        <p
          onClick={() => {
           navigate("/eco-crafts")
            closeSidebar();
          }}
          className="text-eco-green hover:underline
           
          cursor-pointer"
        >
          Ecocrafts
        </p>
        <p
          onClick={() => {
            navigate("/contact");
            closeSidebar();
          }}
          className="text-eco-green hover:underline
          
          cursor-pointer"
        >
          Contact
        </p>
        
      </div>
    </div>
  );
};

export default Sidebar;
