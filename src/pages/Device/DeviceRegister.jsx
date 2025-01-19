import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { UpperMessage } from "../main"; // 상단 메시지 컴포넌트
import {
  ContentWrapper,
  ContentContainer,
} from "../../components/StyledComponents/LayoutStyles";
import DeviceRegisterStepper from "../../components/DeviceRegisterStepper.jsx";
import { useNavigate } from "react-router-dom"
const UpperMessageBlack = styled(UpperMessage)`
  color: black;
`;


// 환경 변수에서 API 기본 URL 가져오기
const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;
const IP_LIST = ["http://168.131.34.101:28080", "http://192.168.0.9:8080"]; //동방 개발
// const IP_LIST = ["http://localhost:8080"]; //로컬 개발

// const UpperMessage = styled.div`
//   font-size: 1.5rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 1.5rem;
// `;

const RegisterButton = styled.button`
  margin-top: 1rem;
  padding: 0.7rem;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#1976D2")};
  color: white;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
`;

export default function DeviceRegister() {
  const [ssids, setSsids] = useState([]); // 모든 SSID 리스트
  const [registeredWifi, setRegisteredWifi] = useState([]); // 등록된 SSID 목록
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계
  const [deviceName, setDeviceName] = useState(""); // 기기 이름
  const navigate = useNavigate();

  // SSID 리스트 불러오기
  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/ssid`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        setSsids(data.data);
      }
    })
    .catch((err) => console.error("SSID 불러오기 실패:", err));
  }, []);

  // 가장 빠른 IP 응답을 받기 위한 함수
  const fetchFastestIP = async () => {
    const abortControllers = IP_LIST.map(() => new AbortController());

    try {
      const fetchPromises = IP_LIST.map((ip, index) =>
          fetch(`${ip}/api/v1/ip`, { signal: abortControllers[index].signal, credentials: "include" })
          .then((res) => res.text())
          .then((data) => ({ ip: data, controller: abortControllers[index] }))
      );

      const fastestResponse = await Promise.any(fetchPromises);
      abortControllers.forEach((controller) => {
        if (controller !== fastestResponse.controller) controller.abort();
      });

      return fastestResponse.ip;
    } catch (error) {
      console.error("IP 요청 실패:", error);
      return null;
    }
  };

  // 내부 IP를 기반으로 기기 등록 요청
  const registerWifi = async () => {
    const internalIp = await fetchFastestIP();
    if (!internalIp) return;

    try {
      const response = await fetch(`${BASE_URL}/api/v1/device/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ip: internalIp }),
      });
      const data = await response.json();
      if (data.error_code === '3030') {
        alert(data.message)
        navigate("/main"); // 🚀 /main으로 이동
        return;
      }

      if (data.data) {
        setRegisteredWifi((prev) => {
          if (!prev.includes(data.data)) {
            setCurrentStep((prev) => prev + 1);
            return [...prev, data.data];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("기기 맥 등록 실패:", error);
    }
  };

  // 기기 최종 등록 요청
  const registerDevice = async () => {
    if (deviceName.trim().length === 0) return;

    try {
      const response = await fetch(`${BASE_URL}/api/v1/device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ device_name: deviceName }),
      });
      const data = await response.json();

      if (response.status === 200 || response.status === 201) {
        alert("기기 등록이 완료되었습니다!");
      }
    } catch (error) {
      console.error("기기 등록 요청 실패:", error);
    }
  };

  // 3초마다 내부 IP 확인 및 기기 등록 실행
  useEffect(() => {
    const interval = setInterval(async () => {
      if (registeredWifi.length<ssids.length) {
        await registerWifi();
      } else {
        clearInterval(interval)
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [registeredWifi, ssids]);

  const steps = [];

  if (registeredWifi.length > 0) {
    registeredWifi.forEach((ssid, index) => {
      steps.push({
        label: `Step ${index + 1}`,
        description: `${registeredWifi[index]} 등록되었습니다.`,
      })
    })
    const remainingSsids = ssids.filter((ssid) => !registeredWifi.includes(ssid));
    remainingSsids.forEach((ssid, index) => {
      steps.push({
        label: `Step ${registeredWifi.length + index + 1}`,
        description: `${ssid} 등록해주세요.`,
      });
    });
  } else {
    steps.push({
      label: "Step 1",
      description: "잠시 기다려주세요.",
    });
    ssids.slice(1, ssids.length).forEach((ssid, index) => {
      steps.push({
        label: `Step ${index + 2}`,
        description: ``,
      })
    })
  }

  steps.push({
    label: "기기 등록 완료",
    description: registeredWifi.length === ssids.length ? "기기 이름 입력" : "",
  });

  return (
      <ContentWrapper>
        <UpperMessageBlack>
          <b>기기 등록</b>을 진행합니다.
        </UpperMessageBlack>
        <ContentContainer>
          <DeviceRegisterStepper steps={steps} currentStep={currentStep} onNicknameChange={(value) => setDeviceName(value)} />
          <RegisterButton disabled={deviceName.trim().length===0} onClick={registerDevice}>
            기기 등록 완료
          </RegisterButton>
        </ContentContainer>
      </ContentWrapper>
  );
}
