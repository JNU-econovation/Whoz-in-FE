import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  position: relative;
`;

export const ModalMessage = styled.div`
  font-size: 1rem;
  white-space: pre-line;
`;

export const ModalButton = styled.div`
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