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
  gap: 1rem;
`;

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <ModalBackground>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ContentWrapper>
                    <ModalMessage>{message}</ModalMessage>
                    <ButtonRow>
                        <ModalButton onClick={onCancel}>취소</ModalButton>
                        <ModalButton onClick={onConfirm}>확인</ModalButton>
                    </ButtonRow>
                </ContentWrapper>
            </ModalContainer>
        </ModalBackground>
    );
};

export default ConfirmModal;
