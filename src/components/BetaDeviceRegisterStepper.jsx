import React from "react";
import styled from "styled-components";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

// 스테퍼 컨테이너
const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

// 개별 스텝
const StepContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// 스텝 표시기
const StepIndicator = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ isCompleted, isActive }) =>
    isCompleted ? "#1976D2" : isActive ? "#fff" : "#e0e0e0"};
  border: ${({ isActive }) => (isActive ? "4px solid #1976D2" : "none")};
  box-shadow: ${({ isActive }) =>
    isActive ? "0 0 0 1px #1976D2" : "none"};
  color: ${({ isCompleted }) => (isCompleted ? "#fff" : "#000")};
`;

// 스텝 텍스트
const StepText = styled.div`
  font-size: 1rem;
  color: ${({ isCompleted, isActive }) =>
    isCompleted || isActive ? "#000" : "#a0a0a0"};
`;

const StepDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${({ isCompleted, isActive }) =>
    isCompleted || isActive ? "#000" : "#a0a0a0"};
`;

const LastStepContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #1976d2;
  color: #fff;
  border-radius: 8px;
`;

export default function DeviceRegisterStepper({ steps = [], currentStep = 0 }) {
  return (
    <StepperContainer>
      {steps.map((step, index) => {
        const isLastStep = index === steps.length - 1;
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;

        // 마지막 단계는 독립적으로 렌더링
        if (isLastStep) {
          return (
            <LastStepContainer key={index}>
              <h2>{step.label}</h2>
              <p>{step.description}</p>
            </LastStepContainer>
          );
        }

        // 일반 단계 렌더링
        return (
          <StepContainer key={index}>
            <StepIndicator isCompleted={isCompleted} isActive={isActive}>
              {isCompleted ? <CheckRoundedIcon /> : index + 1}
            </StepIndicator>
            <div>
              <StepText isCompleted={isCompleted} isActive={isActive}>
                {step.label}
              </StepText>
              <StepDescription isCompleted={isCompleted} isActive={isActive}>
                {isCompleted
                  ? `${step.description} 완료`
                  : isActive
                  ? `${step.description} 중입니다.`
                  : step.description}
              </StepDescription>
            </div>
          </StepContainer>
        );
      })}
    </StepperContainer>
  );
}
