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

const SelectModal = ({ title: message, actions }) => {
    return (
        <ModalBackground>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ContentWrapper>
                    <ModalMessage>{message}</ModalMessage>
                    <ButtonRow>
                        {actions.map(({ label, onClick }, idx) => (
                            <ModalButton key={idx} onClick={onClick}>
                                {label}
                            </ModalButton>
                        ))}
                    </ButtonRow>
                </ContentWrapper>
            </ModalContainer>
        </ModalBackground>
    );
};

export default SelectModal;