import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.4rem;
  padding-bottom: 2.4rem;
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
  color: ${({ isActive }) => (isActive ? "#1F2024" : "#808080")}; /* 활성화된 탭은 검정색, 비활성화된 탭은 회색 */
  font-size: 1rem;
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")}; /* 활성화된 탭은 볼드체, 비활성화된 탭은 일반체 */
`;

const NavIcon = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#006FFD" : "#D4D6DD")}; /* 파란색은 선택된 탭, 회색은 아닌 탭 */
  margin-bottom: 6px;
`;

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 맞춰 활성화된 탭을 결정
  const isMainActive = location.pathname === "/main";
  const isMypageActive = location.pathname === "/mypage";

  return (
    <NavContainer>
      <NavButton onClick={() => navigate("/main")} isActive={isMainActive}>
        <NavIcon isActive={isMainActive} />
        동방 현황
      </NavButton>
      <NavButton onClick={() => navigate("/mypage")} isActive={isMypageActive}>
        <NavIcon isActive={isMypageActive} />
        마이페이지   
      </NavButton>
    </NavContainer>
  );
}

export default BottomNav;
