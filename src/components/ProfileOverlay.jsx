// ProfileOverlay 컴포넌트 구현
import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Block from "./users/Block"
import Profile from "./users/Profile"
import { customFetch } from '../api/customFetch';

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
  background-color: #ffffff;
  border-radius: 30px 30px 0 0;
  padding: 3rem;
  padding-bottom: 9rem;
  height: calc(100vh - 200px);
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const ProfileOverlay = ({ memberId, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const contentRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchMoveY, setTouchMoveY] = useState(null);

  // 멤버 프로필 정보 불러오기
  const fetchProfile = async () => {
    try {
      const response = await customFetch(`${BASE_URL}/api/v1/members/${memberId}/profile`);
      const result = await response.json();
      if (result.data) {
        setProfileInfo({
          generation: result.data.generation,
          name: result.data.member_name,
          position: result.data.position,
        });
      }
    } catch (err) {
      console.error("프로필 로드 실패:", err);
    }
  };

  useEffect(() => {
    if (memberId) {
      setShouldRender(true);
      fetchProfile(); // 프로필 조회
      setTimeout(() => {
        setVisible(true);
        contentRef.current?.scrollTo({ top: 0 });
      }, 10);
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
            visible={visible}
            onTransitionEnd={handleTransitionEnd}
        >
          <WhitePanel
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
          >
            {profileInfo && <Profile profileInfo={profileInfo} isEditable={false} />}
            <Block memberId={memberId} />
          </WhitePanel>
        </OverlayWrapper>
      </>
  );
};

export default ProfileOverlay;
