import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Join from "./pages/join";
import Main from "./pages/main";
import Header from "./components/LayoutComponent/Header";
import BottomNav from "./components/LayoutComponent/BottomNav";
import MyPage from "./pages/mypage";
import ManageDevice from "./pages/account/ManageDevice";
import MyProfile from "./pages/account/MyProfile";
import Setting from "./pages/account/setting";

const App = () => {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/profile" element={<MyProfile />} />
            <Route path="/mypage/device-management" element={<ManageDevice />} />
            <Route path="/mypage/setting" element={<Setting />} />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </div>
  );
};

export default App;
