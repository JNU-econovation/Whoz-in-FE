import React from 'react';
import styled, { keyframes } from 'styled-components';

// 눈송이 떨어지는 애니메이션 
const FallingAnimation = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

// 눈송이 모양 스타일링
const Snowflake = styled.div`
  position: absolute;
  top: -2rem;
  left: ${({ left }) => left}%;
  font-size: ${({ size }) => size}rem;
  opacity: 0;
  color: white;
  animation: ${FallingAnimation} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
`;
//TODO: 근데 왜 이렇게 갑자기 커졌지...
// 눈송이 컴포넌트 생성 함수
const generateSnowflakes = (count) => {
  const snowflakes = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 0.5 + 0.6; // 0.8rem ~ 1.4rem
    const left = Math.random() * 100; // 0% ~ 100%
    const duration = Math.random() * 25 + 20; 
    const delay = Math.random() * 5; 
    snowflakes.push(
      <Snowflake
        key={i}
        size={size}
        left={left}
        duration={duration}
        delay={delay}
      >
        ⦁
      </Snowflake> //❄
    );
  }
  return snowflakes;
};

const SnowAnimation = ({ count = 100 }) => {
  return (
    <>
      {generateSnowflakes(count)}
    </>
  );
};

export default SnowAnimation;
