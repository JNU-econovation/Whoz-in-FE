import React from "react";
import { AuthProvider } from "./context/AuthContext";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom"

// auth
import Login from "./pages/auth/login";
import Join from "./pages/auth/join";
import KakaoRedirect from "./pages/auth/KakaoRedirect";
import BetaLogin from "./pages/auth/BetaLogin";
import OAuthSuccess from "./pages/auth/OAuthSuccess";

import DeviceRegister from "./pages/Device/DeviceRegister";
// import BetaDeviceRegister from "./pages/Device/BetaDeviceRegister";

import Header from "./components/LayoutComponent/Header";
import BottomNav from "./components/LayoutComponent/BottomNav";

import Main from "./pages/main";
import MyPage from "./pages/mypage";
import ManageDevice from "./pages/account/ManageDevice";
import Setting from "./pages/account/setting";
import VOCForm from "./pages/account/VOCForm";

const App = () => {
  const location = useLocation();  // 현재 경로를 확인

  // 로그인 또는 회원가입 페이지일 때 BottomNav를 숨기기
  const authRoutes = ['/login', '/join', '/beta-login', '/device-register'];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (

    <div className="root-wrap">
      <Header />
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beta-login" element={<BetaLogin />} />
          <Route path="/oauth/kakao" element={<KakaoRedirect />} />
          <Route path="/oauth/success" element={<OAuthSuccess />} />
          {/* <Route path="/oauth/member-info" element={<MemberInfo />} />
          <Route path="/oauth/auth-info" element={<AuthInfo />} />   <Route path="/beta-register" element={<BetaDeviceRegister />} />*/}

          <Route path="/device-register" element={<DeviceRegister />} />
        
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/device-management" element={<ManageDevice />} />
          <Route path="/mypage/setting" element={<Setting />} />
          <Route path="/mypage/voc" element={<VOCForm />} />
          
          <Route path="*" element={<div>404: 규민이가 잘못보냄</div>} />
        </Routes>
      </div>
      {/* 로그인과 회원가입 페이지에서는 BottomNav 숨기기 */}
      {!isAuthPage && <BottomNav />}
    </div>

  );
};

const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

export default Root;