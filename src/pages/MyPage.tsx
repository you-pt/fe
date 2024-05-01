import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import ScheduleInputs from "../components/schedule/Inputs";
import ScheduleLists from "../components/schedule/Lists";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateType } from "../store/store";

function MyPage() {
  const isLogin = useSelector((state: StateType) => state.login.isLogin);
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
      alert("로그인이 필요합니다.");
    }
  }, [isLogin]);

  const getSchedule = useCallback(async () => {
    const scheduleList = await axios({
      method: "GET",
      url: "/schedule",
      withCredentials: true,
    });
    setSchedules(scheduleList.data);
  }, [schedules]);

  return (
    <div>
      <Topbar />
      <div className="pt-20">
        <div className="flex flex-row">
          <ScheduleInputs schedules={schedules} getSchedule={getSchedule} />
          <ScheduleLists schedules={schedules} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
