import React from "react";
import styled from "styled-components";
import {
    ContentWrapper,
    ContentContainer,
} from "../../components/StyledComponents/LayoutStyles";
import { UpperMessage } from "../main"

const UpperMessageBlack = styled(UpperMessage)`
  color: black;
`;

const ManageDevice = () => {

    //TODO: 기기 이름/ MAC 주소/ 기기 삭제 버튼/ 맥주소 수정
    return (
        <ContentWrapper>
            <UpperMessageBlack>
                <div>
                    <b>기기 관리</b>
                    <br/>등록된 기기 목록과 기기 추가 기능을 관리합니다.
                </div>
            </UpperMessageBlack>
            <ContentContainer>

            </ContentContainer>
        </ContentWrapper>
    );
};

export default ManageDevice;