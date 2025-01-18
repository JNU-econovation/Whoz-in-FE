import React, { useState } from "react";
import { styled } from "styled-components";

import { UpperMessage } from "../main"; // 상단 메시지 컴포넌트
import {
  ContentWrapper,
  ContentContainer,
} from "../../components/StyledComponents/LayoutStyles";
import DeviceRegisterStepper from "../../components/DeviceRegisterStepper.jsx";

const UpperMessageBlack = styled(UpperMessage)`
  color: black;
`;

export default function DeviceRegister() {
  // 단계 데이터 정의
  const steps = [
    { label: "Step 1", description: "첫 번째 Wi-Fi에 연결 " },
    { label: "Step 2", description: "두 번째 Wi-Fi에 연결 " },
    { label: "Step 3", description: "세 번째 Wi-Fi에 연결 " },
    { label: "기기 등록 완료", description: " " },
  ];

  // 현재 단계 관리
  const [currentStep, setCurrentStep] = useState(0);

  // API 호출 함수 (예시)
  const proceedToNextStep = async () => {
    try {
      const response = await fetch("/api/next-step", {
        method: "POST",
        body: JSON.stringify({ currentStep }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.success) {
        // API 응답에 따라 단계 이동
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  // 컴포넌트가 마운트되거나 단계가 변경될 때 API 호출
  React.useEffect(() => {
    if (currentStep < steps.length - 1) {
      proceedToNextStep();
    }
  }, [currentStep]);

  return (
    <ContentWrapper>
      <UpperMessageBlack>
        <b>기기 등록</b>을
        <br />
        진행합니다.
      </UpperMessageBlack>

      <ContentContainer>
        <DeviceRegisterStepper steps={steps} currentStep={currentStep} />
      </ContentContainer>
    </ContentWrapper>
  );
}
