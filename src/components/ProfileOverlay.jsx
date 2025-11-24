import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Block from "./users/Block"
import Profile from "./users/Profile"
import { customFetch } from '../api/customFetch';
import { useMainActions } from "../hooks/useMainActions";
import { useMemberInfo } from '../hooks/useMemberInfo';

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


const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const ProfileOverlay = ({ memberId, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  // const [profileInfo, setProfileInfo] = useState(null);
  const { memberInfo } = useMemberInfo(memberId);

  const contentRef = useRef(null);
  const dragStartYRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 프로필 조회
  useEffect(() => {
    if (!memberId) {
      setVisible(false);
      return;
    }
    setShouldRender(true);


    // fetch(`${BASE_URL}/api/v1/members/${memberId}/profile`, { credentials: 'include' })
    // .then(r => r.json())
    // .then(json => {
    //   const d = json.data;
    //   setProfileInfo({
    //     generation: d.generation,
    //     name: d.member_name,
    //     position: d.position,
    //     profile_image_url: d.profile_image_url,
    //   });
    // });

    // 살짝 딜레이 줘야 트랜지션 먹음
    setTimeout(() => {
      setVisible(true);
      // 항상 맨 위로 스크롤
      contentRef.current?.scrollTo(0, 0);
    }, 10);
  }, [memberId]);

  const handleClose = () => {
    // 닫힐 때 overflow 복구
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

  // 터치 시작: Y좌표만 기억
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
    setIsDragging(false);
    setDragOffset(0);
  };

  // 터치 이동: 스크롤 -> 드래그 자연 전환
  const handleTouchMove = (e) => {
    const moveY = e.touches[0].clientY;
    const panel = contentRef.current;
    if (!panel) return;

    // 현재 스크롤 위치
    const scrollTop = panel.scrollTop;

    // 아직 드래그 시작 안했을 때
    if (!isDragging) {
      if (scrollTop > 0) return;

      // 아래로 당기기 시작한 경우
      if (moveY > touchStartY) {
        setIsDragging(true);
        dragStartYRef.current = moveY; // 기준점 새로 설정!
        panel.style.overflow = 'hidden';
      } else {
        return;
      }
    }

    // 드래그 중일 때
    e.preventDefault();
    const delta = moveY - dragStartYRef.current;
    setDragOffset(delta > 0 ? delta : 0);
  };


  // 터치 종료: 기준치 이상이면 닫기, 아니면 복구
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
            {memberInfo && (
                  <Profile profileInfo={memberInfo} isEditable={true} />
            )}
            <Block memberId={memberId} />
          </WhitePanel>
        </OverlayWrapper>
      </>
  );
};

export default ProfileOverlay;
