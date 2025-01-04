import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            console.log("Kakao Auth Code:", code);
            // TODO: 일단 콘솔로그 찍어놓음... 백엔드 서버로 인증 코드 전달
        } else {
            console.error("인증코드 없음");
        }
    }, []);

    return <div>⏳ 카카오 로그인 중입니다 ⌛️</div>;
};

export default KakaoRedirect;
