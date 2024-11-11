import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Join from "./pages/join";
import Main from "./pages/main";
import Header from "./components/LayoutComponent/Header";
import BottomNav from "./components/LayoutComponent/BottomNav";

const App = () => {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/main" element={<Main />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </div>
  );
};

export default App;
