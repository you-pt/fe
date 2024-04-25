import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Diet from "./pages/Diet";
import LiveSession from "./pages/Live";
import { ThemeProvider } from "@material-tailwind/react";
import SessionListComponent from "./components/streamList/streamList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import axios from 'axios'
import ChatComponent from "./components/ChatComponent";

axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/live" element={<LiveSession/>}/>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path = "/list" element={<SessionListComponent/>}/>
          <Route path = "/chat" element = {<ChatComponent/>}/>
          <Route path="/live/:sessionId?" element={<LiveSession/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  // </React.StrictMode>
);
