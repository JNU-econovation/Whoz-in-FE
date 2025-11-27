import React from "react";
import Overlay from "./Overlay";
import Block from "./users/Block";
import Profile from "./users/Profile";
import { useMemberInfo } from '../hooks/useMemberInfo';

const ProfileOverlay = ({ memberId, onClose }) => {
  const { memberInfo } = useMemberInfo(memberId);

  return (
      <Overlay isOpen={!!memberId} onClose={onClose}>
        {memberInfo && (
            <>
              <Profile profileInfo={memberInfo} isEditable={true} />
              <Block memberId={memberId} />
            </>
        )}
      </Overlay>
  );
};

export default ProfileOverlay;