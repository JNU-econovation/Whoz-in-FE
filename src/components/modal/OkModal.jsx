import React from "react";
import styled from "styled-components";
import { ModalBackground, ModalContainer, ModalMessage, ModalButton } from "./ModalStyles";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const OkModal = ({ message, onOk }) => {
    return (
        <ModalBackground>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ContentWrapper>
                    <ModalMessage>{message}</ModalMessage>
                    <ButtonRow>
                        <ModalButton onClick={onOk}>확인</ModalButton>
                    </ButtonRow>
                </ContentWrapper>
            </ModalContainer>
        </ModalBackground>
    );
};

export default OkModal;
