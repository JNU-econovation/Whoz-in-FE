import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Query Parameter에서 is_registered 값 추출
        const params = new URLSearchParams(window.location.search);
        const isRegistered = params.get("is_registered");

        if (isRegistered === "false") {
            // 회원가입이 필요하면 추가 정보 페이지로 이동
            navigate("/register");
        } else {
            // 이미 가입된 경우 메인 페이지로 이동
            navigate("/main");
        }
    }, [navigate]);

    return <div>로그인 상태 확인 중...</div>;
};

export default OAuthSuccess;
