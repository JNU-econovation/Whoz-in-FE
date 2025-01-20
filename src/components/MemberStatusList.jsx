import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { ListContainer, ListItem } from "./StyledComponents/LayoutStyles";

// 활동 상태 표시 초록불
const ActiveStatus = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "green" : "#bbbbbb")};
  margin-left: auto;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
`;

const ActiveTime = styled.span`
  color: gray;
  font-size: 0.9rem;
  margin-left: auto;
  cursor: pointer;
`;

const MemberListContainer = styled(ListContainer)`
  border-radius: 30px 30px 0 0;
  min-height: 30rem;
  margin-bottom: 2.5rem;
`;

const MemberStatusList = ({ members }) => {
  const [showTime, setShowTime] = useState([]);
  // members가 변경될 때 기존 상태를 유지하면서 새 멤버 추가 - member id로 관리
  useEffect(() => {
    setShowTime((prevShowTime) => {
      const newShowTime = {};
      // 기존 상태 유지하면서 새로운 멤버 추가
      members.forEach((member) => {
        // alert(prevShowTime[member.member_id])
        newShowTime[member.member_id] = prevShowTime[member.member_id] || false;
      });

      return newShowTime; // 업데이트된 상태 반환
    });
  }, [members]);

  const toggleShowTime = (member_id, isActive) => {
    if (!isActive) return; // 비활성화 상태에서는 클릭 불가능
    setShowTime((prev) => ({
      ...prev,
      [member_id]: !prev[member_id],
    }));
  };

  return (
    <MemberListContainer>
      {members.map((member, index) => (
        <ListItem key={index}>
          {member.generation}기 {member.member_name}

          {showTime[member.member_id] ? (
            <ActiveTime onClick={() => toggleShowTime(member.member_id, member.is_active)}>
              {member.total_active_time}
            </ActiveTime>
          ) : (
            <ActiveStatus
              isActive={member.is_active}
              onClick={() => toggleShowTime(member.member_id, member.is_active)}
            />
          )}
        </ListItem>
      ))}
    </MemberListContainer>
  );
};

export default MemberStatusList;