import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa"; // 필요한 아이콘을 가져옵니다.

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;

  display: flex;
  justify-content: space-between; /* 버튼을 양쪽 끝에 배치 */
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1); 
  background-color: white;
  z-index: 1000;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
  align-items: center;
  background: none;
  border: none;
  color: #007bff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
  
  svg {
    font-size: 1.5rem; 
    margin-bottom: 4px; 
    }
`;

function BottomNav() {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavButton onClick={() => navigate("/main")}>
        <FaBars /> 
        메인
      </NavButton>
      <NavButton onClick={() => navigate("/mypage")}>
        <FaUser /> 
        마이페이지
      </NavButton>
    </NavContainer>
  );
}

export default BottomNav;
