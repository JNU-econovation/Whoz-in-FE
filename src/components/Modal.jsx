import React from "react";
import styled from "styled-components";
import { ModalBackground, ModalContainer } from "./StyledComponents/ModalStyles";

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 10px;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

const Modal = ({ children, onClose }) => {
    return (
        <ModalBackground onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>✖</CloseButton>
                {children}
            </ModalContainer>
        </ModalBackground>
    );
};

export default Modal;