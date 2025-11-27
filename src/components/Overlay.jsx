import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useMainActions } from "../hooks/useMainActions";

const OverlayWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  overflow: visible;
  transform: ${({ visible, dragOffset }) =>
    visible
        ? `translateY(${dragOffset}px)`
        : "translateY(100%)"};
  transition: ${({ isDragging }) =>
    isDragging ? "none" : "transform 0.2s ease-in-out"};
`;

const DimmedBackground = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 99;
  background: transparent;
`;

const WhitePanel = styled.div`
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.10);
  padding-bottom: 9rem;
  height: calc(100dvh - 350px);

  overflow-y: auto;
  overscroll-behavior: contain;
`;

const DragIndicator = styled.div`
  width: 3.5rem;
  height: 5px;
  background-color: #dadada;
  border-radius: 3px;
  margin: 0.5rem auto;
`;


const Overlay = ({ isOpen, onClose, children }) => {
    const [visible, setVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const contentRef = useRef(null);
    const dragStartYRef = useRef(null);
    const [touchStartY, setTouchStartY] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => {
                setVisible(true);
                contentRef.current?.scrollTo(0, 0);
            }, 10);
        } else {
            // 이미 열려있을 때 닫는 경우
            if (shouldRender) {
                handleClose();
            }
        }
    }, [isOpen]);

    const handleClose = () => {
        if (contentRef.current) contentRef.current.style.overflow = 'auto';
        setDragOffset(0);
        setVisible(false);
    };

    useEffect(() => {
        useMainActions.getState().setTriggerOverlayClose(() => handleClose());
        return () => {
            useMainActions.getState().setTriggerOverlayClose(() => {});
        };
    }, []);

    const handleTransitionEnd = () => {
        if (!visible) {
            setShouldRender(false);
            onClose();
        }
    };

    const handleTouchStart = (e) => {
        setTouchStartY(e.touches[0].clientY);
        setIsDragging(false);
        setDragOffset(0);
    };

    const handleTouchMove = (e) => {
        const moveY = e.touches[0].clientY;
        const panel = contentRef.current;
        if (!panel) return;

        const scrollTop = panel.scrollTop;

        if (!isDragging) {
            if (scrollTop > 0) return;
            if (moveY > touchStartY) {
                setIsDragging(true);
                dragStartYRef.current = moveY;
                panel.style.overflow = 'hidden';
            } else {
                return;
            }
        }
        e.preventDefault();
        const delta = moveY - dragStartYRef.current;
        setDragOffset(delta > 0 ? delta : 0);
    };

    const handleTouchEnd = () => {
        const THRESHOLD = 80;
        if (isDragging) {
            if (dragOffset > THRESHOLD) {
                handleClose();
            } else {
                setDragOffset(0);
                if (contentRef.current) contentRef.current.style.overflow = 'auto';
            }
        }
        setIsDragging(false);
        setTouchStartY(null);
    };

    if (!shouldRender) return null;

    return (
        <>
            <DimmedBackground onClick={handleClose} />
            <OverlayWrapper
                visible={visible}
                dragOffset={dragOffset}
                isDragging={isDragging}
                onTransitionEnd={handleTransitionEnd}
            >
                <WhitePanel
                    ref={contentRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <DragIndicator />
                    {children}
                </WhitePanel>
            </OverlayWrapper>
        </>
    );
};

export default Overlay;