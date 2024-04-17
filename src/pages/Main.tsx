import React from "react";
import Topbar from "../components/Topbar";


const Main = () => {
  return (
    <div>
      <div className="fixed z-50 opacity-100">
        <Topbar />
      </div>
      <div className="bg-slate-800">
        <img
          className="opacity-75 w-screen h-screen"
          src="https://img.freepik.com/premium-photo/a-gym-with-treadmills-and-a-window-that-says-gym_860805-2173.jpg?w=1480"
        />
      </div>
    </div>
  );
};

export default Main;
