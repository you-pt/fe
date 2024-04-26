import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {Cookies}from 'react-cookie'

import Main from "./pages/Main";
import Diet from "./pages/Diet";
import LiveSession from "./pages/Live";
import SessionListComponent from "./components/streamList/streamList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { StateType } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./store/slices/loginSlice";
import MyPage from "./pages/MyPage";

function App() {
  const isLogin = useSelector((state: StateType) => state.login.isLogin);
  const dispatch = useDispatch()

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get<string>("Authorization")
    if (token) {
      dispatch(signin())
    }
  },[])
  
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/diet" element={<Diet />} />
      <Route path="/live" element={<LiveSession />} />
      <Route path="/list" element={<SessionListComponent />} />
      <Route path="/live/:sessionId?" element={<LiveSession />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;