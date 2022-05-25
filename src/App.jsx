import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";

export default function App() {
  return (
    <div className="bg-slate-800">
      <Routes>
        <Route exact path="/" element={<Chats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </div>
  );
}
