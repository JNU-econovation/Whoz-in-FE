import React from "react";
import styled from "styled-components";

const BadgeWrapper = styled.span`
  background-color: ${({ color }) => (color ? `${color}4D` : "#eee")}; // 30% 투명도 배경
  color: ${({ color }) => (color ? `color-mix(in srgb, ${color}, black 35%)` : "#444")}; // 글자색을 35% 더 진하게 조정
  border: 1px solid ${({ color }) => (color ? `${color}33` : "#ccc")}; // 20% 투명도 테두리 추가로 배경과 구분
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 20px; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin-left: 0.5rem;
  text-transform: uppercase;
`;

const Badge = ({ text, color }) => {
  // 색상이 # 없이 오는 경우 처리
  const validColor = color && !color.startsWith("#") ? `#${color}` : color;
  return <BadgeWrapper color={validColor}>{text}</BadgeWrapper>;
};

export default Badge;
