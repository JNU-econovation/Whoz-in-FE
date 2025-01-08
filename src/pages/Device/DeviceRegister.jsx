import React from "react";
import { styled } from "styled-components";

import { UpperMessage } from "../main"; // 상단 메시지 컴포넌트
import { ContentWrapper, ContentContainer } from "../../components/StyledComponents/LayoutStyles";
import DeviceRegisterStepper from "../../components/DeviceRegisterStepper.jsx";


const UpperMessageBlack = styled(UpperMessage)`
  color: black;
`;


export default function DeviceRegister() {
  return (
    <ContentWrapper>
      <UpperMessageBlack>
        <b>기기 등록</b>을
        <br />
        진행합니다.
      </UpperMessageBlack>
   
      <ContentContainer>
     <DeviceRegisterStepper />
      </ContentContainer>
    </ContentWrapper>
  );
}
