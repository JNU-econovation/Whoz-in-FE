import React from "react";
import styled from "styled-components";
import { ModalBackground, ModalContainer } from "./StyledComponents/ModalStyles";


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1rem;
  //font-weight: bold;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled.div`
  padding: 0.8rem 1.6rem;
  border-radius: 6px;
  background-color: #d1d1d1;
  color: black;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #9e9e9e;
  }
`;

const ActionModal = ({ title, actions }) => {
    return (
        <ModalBackground>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ContentWrapper>
                    <Title>{title}</Title>
                    <ButtonRow>
                        {actions.map(({ label, onClick }, idx) => (
                            <StyledButton key={idx} onClick={onClick}>
                                {label}
                            </StyledButton>
                        ))}
                    </ButtonRow>
                </ContentWrapper>
            </ModalContainer>
        </ModalBackground>
    );
};

export default ActionModal;