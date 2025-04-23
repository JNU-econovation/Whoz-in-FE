import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: rgba(255,255,255,0.6);
`;

const SpinnerCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid transparent;
  border-top: 6px solid #b5d8f6;  /* 파란색 */
  border-left: 6px solid #b5d8f6; /* 파란색 */
  border-bottom: 6px solid white; /* 흰색 */
  border-right: 6px solid white;  /* 흰색 */
  border-radius: 80%;
  animation: ${rotate} 0.8s linear infinite;
`;

const Spinner = () => (
    <SpinnerWrapper>
        <SpinnerCircle />
    </SpinnerWrapper>
);

export default Spinner;
