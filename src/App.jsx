import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { useLoading } from "./context/LoadingContext";
import Spinner from './components/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom"

import Login from "./pages/auth/login";
import Join from "./pages/auth/join";
import KakaoRedirect from "./pages/auth/KakaoRedirect";
import BetaLogin from "./pages/auth/BetaLogin";
import OAuthSuccess from "./pages/auth/OAuthSuccess";

import DeviceRegister from "./pages/Device/DeviceRegister";

import Header from "./components/LayoutComponent/Header";
import BottomNav from "./components/LayoutComponent/BottomNav";

import Main from "./pages/main";
import MyPage from "./pages/mypage";
import ManageDevice from "./pages/account/ManageDevice";
import Setting from "./pages/account/setting";
import VOCForm from "./pages/account/VOCForm";

const queryClient = new QueryClient();

const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    bottom: 80px;
  }
  .Toastify__toast {
    border-radius: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .Toastify__toast-body {
    font-size: 1rem;
  }
`;

const App = () => {
  const location = useLocation();
  const { loading } = useLoading();

  const authRoutes = ['/login', '/join', '/beta-login', '/device-register'];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
      <div className="root-wrap">
        <StyledToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={true}
            closeButton={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        {loading && <Spinner />}
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/beta-login" element={<BetaLogin />} />
            <Route path="/oauth/kakao" element={<KakaoRedirect />} />
            <Route path="/oauth/success" element={<OAuthSuccess />} />

            <Route path="/device-register" element={<DeviceRegister />} />

            <Route path="/main" element={<Main />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/device-management" element={<ManageDevice />} />
            <Route path="/mypage/setting" element={<Setting />} />
            <Route path="/mypage/voc" element={<VOCForm />} />

            <Route path="*" element={<div>404: 규민이가 잘못보냄</div>} />
          </Routes>
        </div>
        {!isAuthPage && <BottomNav />}
      </div>
  );
};

const Root = () => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
);

export default Root;