import axios from "axios";
import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import ScheduleInputs from "../components/schedule/Inputs";
import ScheduleLists from "../components/schedule/Lists";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateType } from "../store/store";

function MyPage() {
  const isLogin = useSelector((state: StateType) => state.login.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
      alert("로그인이 필요합니다.");
    }
  }, [isLogin]);

  return (
    <div>
      <Topbar />
      <div className="pt-20">
        <div className="flex flex-row">
          <ScheduleInputs />
          <ScheduleLists />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
