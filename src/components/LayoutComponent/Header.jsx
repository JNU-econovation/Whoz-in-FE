import { FaAngleLeft } from "react-icons/fa";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const HeaderContainer = styled.header` // 헤더 스타일
  display: flex;
  position: fixed;
  top:0;
  left:0;
  right:0;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: whitesmoke;
  // border-bottom: 0.1rem gray solid;
  min-height: 1rem;
`;

const BackButtonWrapper = styled.div` // 버튼 래퍼
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "auto" : "none")}; // 버튼 클릭 비활성화
`;

// TODO: 뒤로가기 버튼 유무에 따라 중앙 후즈인 텍스트가 움직이는 오류 고쳐야됨

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // 뒤로가기 버튼 초기 로그인 페이지에서 숨기기
  const showBackButton = location.pathname !== "/";

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
