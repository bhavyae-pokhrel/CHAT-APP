import React,{Suspense,lazy} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import SetAvatar from "./components/SetAvatar";
//import Chat from "./pages/Chat";
//import Login from "./pages/Login";
//import Register from "./pages/Register";
const SetAvatar =lazy(()=>import("./components/SetAvatar"));
const Chat =   lazy(()=>import("./pages/Chat"));
const Login =  lazy(()=>import("./pages/Login"));
const Register=lazy(()=>import("./pages/Register"));
export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Suspense>
      
    </BrowserRouter>
  );
}
