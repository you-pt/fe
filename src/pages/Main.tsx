import React from "react";
import Topbar from "../components/Topbar";
import GymImage from '../assets/gym.avif'
import SessionListComponent from "../components/streamList/streamList";


const Main = () => {
  return (
    <div>
      <div className="fixed z-50 opacity-100">
        <Topbar />
      </div>
      <div
      className="bg-slate-800"
      style={{
        backgroundImage: `url(${GymImage})`,
        backgroundSize: 'cover', // 이미지를 화면에 맞게 조절하여 꽉 채움
        backgroundPosition: 'center', // 이미지를 가운데 정렬
        height: '100vh', // 화면 전체 높이
        width: '100vw', // 화면 전체 너비
        opacity: 0.75, // 배경 이미지의 투명도
        paddingTop: '64px', // 탑바의 높이에 따라 조정 (예: 탑바의 높이가 64px인 경우)
      }}
    >
      <SessionListComponent/>
    </div>
    </div>
  );
};

export default Main;
