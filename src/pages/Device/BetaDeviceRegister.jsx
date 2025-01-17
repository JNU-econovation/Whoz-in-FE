import React from "react";
import { styled } from "styled-components";

import { UpperMessage } from "../main.jsx"; // 상단 메시지 컴포넌트
import { ContentWrapper, ContentContainer } from "../../components/StyledComponents/LayoutStyles.jsx";
import BetaDeviceRegisterStepper from "../../components/BetaDeviceRegisterStepper.jsx";
import DeviceRegisterStepper from "../../components/DeviceRegisterStepper.jsx";

const UpperMessageBlack = styled(UpperMessage)`
  color: black;
`;


export default function BetaDeviceRegister() {
  return (
    <ContentWrapper>
      <UpperMessageBlack>
        <b>기기 등록</b>을
        <br />
        진행합니다.
      </UpperMessageBlack>
   
      <ContentContainer>
     <BetaDeviceRegisterStepper />
      </ContentContainer>
    </ContentWrapper>
  );
}
