import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import SignUp from "../components/SignUp";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { StateType } from "../store/store";
import { useSelector } from "react-redux";

export default () => {
  const navigate = useNavigate()
  const isLogin = useSelector((state: StateType) => state.login.isLogin)
  useEffect(() => {
    if (isLogin) {
      navigate("/")
    }
  }, [isLogin])
  return (
    <div>
      <Topbar />
      <div className="pt-20">
        <SignUp />
      </div>
    </div>
  );
};
