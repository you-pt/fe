import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Diet from "./pages/Diet";
import LiveSession from "./pages/Live";
import { ThemeProvider } from "@material-tailwind/react";
import ChatRoomPage from "./pages/ChatRoom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/live" element={<LiveSession/>}/>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/rooms" element={<ChatRoomPage/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
