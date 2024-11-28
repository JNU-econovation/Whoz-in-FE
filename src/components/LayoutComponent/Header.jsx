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
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 0.1rem gray solid;
  border-radius: 0 0 2rem 2rem;
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
      <div>헤더... 아직 디자인 안 함</div>
    </HeaderContainer>
  );
}

export default Header;
