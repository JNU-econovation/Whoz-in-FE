import React, { useState } from "react"
import styled from "styled-components"
import {
    Container as BasicContainer,
    KakaoButton as KakaoButtonBasic,
} from "../../components/StyledComponents/AuthStyles"

const Container = styled(BasicContainer)`

  text-align: center;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -3rem;
`;
const Logo = styled.img`
  width: 7rem;
  margin: 5rem;
  margin-top: 3rem;
  align-items: center;
justify-content: center;
  `;
const Header = styled.h1`
  font-size: 2.3rem;
  font-weight: bolder;
  font-family: "Pretendard-bold", sans-serif;
  margin-bottom: 0.1rem;
  color: #333;
`;

const SubHeader = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0rem;
`;

const KakaoButton = styled(KakaoButtonBasic)`
  width: 100%;
  max-width: 300px;
  font-size: 1.2rem;
  padding: 0.6rem;
  margin: 0.7rem 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ isClicked }) => (isClicked ? "scale(0.95)" : "scale(1)")};
  opacity: ${({ isClicked }) => (isClicked ? 0.8 : 1)};
`;

const BetaLogin = () => {
  const [clickedAction, setClickedAction] = useState(null);

  const handleKakaoLogin = (forceLoginPrompt = false) => {
    setClickedAction(forceLoginPrompt ? "prompt" : "default");

    setTimeout(() => {
      const authUrl = new URL(
        `${process.env.REACT_APP_BACKEND_BASEURL}/oauth2/authorization/kakao`
      );

      if (forceLoginPrompt) {
        authUrl.searchParams.set("prompt", "login");
      }

      window.location.href = authUrl.toString();
    }, 500); // 버튼 애니메이션 시간 + 지연 시간
  };

  return (
    <Container>
      <Header>WhozIn</Header>
      <SubHeader>by Team gyu.jar</SubHeader>

      <Logo src="/logocartoon.png" alt="Logo" />
      <KakaoButton
        onClick={() => handleKakaoLogin(false)}
        isClicked={clickedAction === "default"}
      >
        카카오로 시작하기
      </KakaoButton>
      <KakaoButton
        onClick={() => handleKakaoLogin(true)}
        isClicked={clickedAction === "prompt"}
      >
        다른 카카오계정으로 로그인
      </KakaoButton>
      {/*}
      <Footer>
        By using this service, you agree to our{" "}
        <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
      </Footer> */}
    </Container>
  );
};

export default BetaLogin;
