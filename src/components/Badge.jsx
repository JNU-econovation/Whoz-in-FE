import React from "react";
import styled from "styled-components";

const BadgeWrapper = styled.span`
  background-color: ${({ color }) => color || "#ddd"}; // 색 못 받아오면 일단 회색으로 처리
  color: white;
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 100%; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; // 줄바꿈 안 되게
`;

const Badge = ({ text, color }) => {
  return <BadgeWrapper color={color}>{text}</BadgeWrapper>;
};

export default Badge;
