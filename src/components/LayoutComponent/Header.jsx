import { FaAngleLeft } from "react-icons/fa";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackButton = styled.button` // 뒤로가기
  position: absolute;
  top: 1rem;
  left: 1rem;
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
  position: relative;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 0.1rem gray solid;
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // 뒤로가기 버튼 초기 로그인 페이지에서 숨기기
  const showBackButton = location.pathname !== "/";

  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaAngleLeft />
        
        </BackButton>
      )}
      <div>WhozIn</div> 
    </HeaderContainer>
  );
}

export default Header;
