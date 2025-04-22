// ProfileOverlay 컴포넌트 구현
import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Block from "./users/Block"

const OverlayWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ top }) => `calc(100vh - ${top}px)`};
  z-index: 100;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  transform: ${({ visible }) => (visible ? "translateY(0%)" : "translateY(100%)")};
  transition: transform 0.15s ease-in-out;
`;

const DimmedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: transparent;
`;

const WhitePanel = styled.div`
  background-color: white;
  border-radius: 30px 30px 0 0;
  padding: 3rem;
  padding-bottom: 9rem;
  height: 100%;
  overflow-y: auto;
`;

const ProfileOverlay = ({ memberId, topOffset, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const contentRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchMoveY, setTouchMoveY] = useState(null);

  useEffect(() => {
    if (memberId) {
      setShouldRender(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [memberId]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleTransitionEnd = () => {
    if (!visible) {
      setShouldRender(false);
      onClose();
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchMoveY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStartY !== null && touchMoveY !== null) {
      const deltaY = touchMoveY - touchStartY;
      const scrollTop = contentRef.current?.scrollTop || 0;
      if (deltaY > 50 && scrollTop <= 0) {
        handleClose();
      }
    }
    setTouchStartY(null);
    setTouchMoveY(null);
  };

  if (!shouldRender) return null;

  return (
      <>
        <DimmedBackground onClick={handleClose} />
        <OverlayWrapper
            top={topOffset}
            visible={visible}
            onTransitionEnd={handleTransitionEnd}
        >
          <WhitePanel
              ref={contentRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
          >
            <Block memberId={memberId} />
            <Block memberId={memberId} />
            <Block memberId={memberId} />
            <Block memberId={memberId} />
          </WhitePanel>
        </OverlayWrapper>
      </>
  );
};

export default ProfileOverlay;
