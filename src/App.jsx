import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";

import Login from "./pages/auth/login";
import Join from "./pages/auth/join";
import KakaoRedirect from "./pages/auth/KakaoRedirect";
import BetaLogin from "./pages/auth/BetaLogin";
import OAuthSuccess from "./pages/auth/OAuthSuccess";
import MemberInfo from "./pages/auth/MemberInfo";
import AuthInfo from "./pages/auth/AuthInfo";

import Header from "./components/LayoutComponent/Header";
import BottomNav from "./components/LayoutComponent/BottomNav";

import Main from "./pages/main";
import MyPage from "./pages/mypage";
import ManageDevice from "./pages/account/ManageDevice";
import MyProfile from "./pages/account/MyProfile";
import Setting from "./pages/account/setting";

const App = () => {
  const location = useLocation();  // 현재 경로를 확인

  // 로그인 또는 회원가입 페이지일 때 BottomNav를 숨기기
  const isAuthPage = location.pathname === '/login' || location.pathname === '/join' || location.pathname === '/beta-login';

  return (
    <div className="root-wrap">
      <Header />
      <div className="content-wrap">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beta-login" element={<BetaLogin />} />
          <Route path="/oauth/kakao" element={<KakaoRedirect />} />
          <Route path="/oauth/success" element={<OAuthSuccess />} />
          {/* <Route path="/oauth/member-info" element={<MemberInfo />} />
          <Route path="/oauth/auth-info" element={<AuthInfo />} /> */}

          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/profile" element={<MyProfile />} />
          <Route path="/mypage/device-management" element={<ManageDevice />} />
          <Route path="/mypage/setting" element={<Setting />} />
        </Routes>
      </div>
      {/* 로그인과 회원가입 페이지에서는 BottomNav 숨기기 */}
      {!isAuthPage && <BottomNav />}
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
