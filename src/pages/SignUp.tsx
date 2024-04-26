import React from "react";
import Topbar from "../components/Topbar";
import SignUp from "../components/SignUp";
import axios from 'axios'

export default () => {
  return (
    <div>
      <Topbar />
      <div className="pt-20">
        <SignUp />
      </div>
    </div>
  );
};
