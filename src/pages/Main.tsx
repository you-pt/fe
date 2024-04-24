import React from "react";
import Topbar from "../components/Topbar";
import GymImage from '../assets/gym.avif'


const Main = () => {
  return (
    <div>
      <div className="fixed z-50 opacity-100">
        <Topbar />
      </div>
      <div className="bg-slate-800">
        <img
          className="opacity-75 w-screen h-screen"
          src={GymImage}
        />
      </div>
    </div>
  );
};

export default Main;
