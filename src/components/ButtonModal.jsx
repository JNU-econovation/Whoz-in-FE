import React from "react";
import styled from "styled-components";
import { ModalBackground, ModalContainer } from "./StyledComponents/ModalStyles";

const Modal = ({ children, onClose }) => {
    return (
        <ModalBackground>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalContainer>
        </ModalBackground>
    );
};

export default Modal;