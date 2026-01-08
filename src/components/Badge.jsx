import React from "react";
import styled from "styled-components";

const BadgeWrapper = styled.span`
  background-color: ${({ color }) => (color && color !== "FF0000" ? `${color}4D` : "#ddd")}; // FF0000(빨간색) 제외하고 투명도 30% 적용
  color: ${({ color }) => (color ? (color === "FF0000" ? "white" : color) : "#666")}; // 글자색은 원본색 (빨간색은 흰색글자)
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
