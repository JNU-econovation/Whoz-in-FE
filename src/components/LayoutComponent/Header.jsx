import { FaAngleLeft } from "react-icons/fa";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";


const HeaderContainer = styled.header` // 헤더 스타일
  display: flex;
  position: fixed;
  min-height: 2rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 1rem;
  min-height: 3rem; /* 적당한 최소 높이 설정 */
  margin-bottom: 1rem;
  
`;

const BackButtonWrapper = styled.div` // 버튼 래퍼
  position: absolute;
  left: 1rem;
  top:2rem;
  display: flex;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "auto" : "none")}; // 버튼 클릭 비활성화
`;


const BackButton = styled.button` // 뒤로가기
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #7c7c7c;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }

  svg {
    margin-right: 8px;
    font-size: 24px;
  }
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // 뒤로가기 버튼 초기 로그인 페이지에서 숨기기
  const showBackButton = location.pathname !== "/" && location.pathname !== "/main";

  return (
    <HeaderContainer>
      <BackButtonWrapper show={showBackButton}>
        <BackButton onClick={() => navigate(-1)}>
          <FaAngleLeft />
        </BackButton>
      </BackButtonWrapper>
    </HeaderContainer>
  );
}

export default Header;
