import React from "react";
import Topbar from "../components/Topbar";
import GymImage from '../assets/gym.avif'
import Notification from "../components/Notification";
import axios from "axios";


const Main = () => {
  return (
    <div>
      <Notification />
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
