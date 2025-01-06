import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, KakaoButton } from "../../components/StyledComponents/AuthStyles";

const BetaLogin = () => {
    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        const KauthLink = process.env.REACT_APP_BACKEND_BASEURL + '/oauth2/authorization/kakao'; 
      
        window.location.href = KauthLink;
    };

    return (
        <Container>
            <h1>베타 버전</h1>
            <p>현재는 카카오 로그인만 지원됩니다.</p>
            <KakaoButton onClick={handleKakaoLogin}>카카오로 로그인</KakaoButton>
        </Container>
    );
};

export default BetaLogin;
