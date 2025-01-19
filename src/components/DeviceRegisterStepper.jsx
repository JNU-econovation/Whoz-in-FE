import React from "react";
import styled from "styled-components";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

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
  box-shadow: ${({ isActive }) => (isActive ? "0 0 0 1px #1976D2" : "none")};
  color: ${({ isCompleted }) => (isCompleted ? "#fff" : "#000")};
`;

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

const NicknameInput = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export default function DeviceRegisterStepper({
  steps = [],
  currentStep = 0,
  onNicknameChange = value => {},
}) {
  return (
      <StepperContainer>
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1;
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;

          // 마지막 단계 (기기 이름 입력)
          if (isLastStep) {
            return (
                <StepContainer key={index}>
                  <StepIndicator isCompleted={isCompleted} isActive={isActive}>
                    {isCompleted ? <CheckRoundedIcon /> : index + 1}
                  </StepIndicator>
                  <div>
                    <StepText isCompleted={isCompleted} isActive={isActive}>
                      {step.label}
                    </StepText>
                    <NicknameInput
                        type="text"
                        placeholder="기기의 별명을 입력하세요."
                        onChange={(e) => onNicknameChange(e.target.value)}
                        disabled={!isActive}
                    />
                  </div>
                </StepContainer>
            );
          }

          // 일반 단계
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
                    {isCompleted && step.description
                        ? `${step.description}`
                        : step.description}
                  </StepDescription>
                </div>
              </StepContainer>
          );
        })}
      </StepperContainer>
  );
}