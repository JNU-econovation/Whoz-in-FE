import React from "react";
import styled from "styled-components";
import { ListContainer, ListItem } from "./StyledComponents/LayoutStyles";

// 활동 상태 초록불
const ActiveStatus = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? 'green' : 'gray')};
  margin-left: auto;
`;

const MemberListContainer = styled(ListContainer)`
  border-radius: 30px 30px 0 0;
`;

const MemberStatusList = ({ members }) => {
  // 동방에 있는 회원 / 나머지 회원 (+ 최근에 접속 안 한)
  const nowActiveMembers = members.filter(member => member.isActive);
  const recentActiveMembers = members
    .filter(member => !member.isActive && member.lastActiveTime)
    .sort((a, b) => new Date(b.lastActiveTime) - new Date(a.lastActiveTime));
  const otherMembers = members
    .filter(member => !member.isActive && !member.lastActiveTime)
    .sort((a, b) => a.name.localeCompare(b.name));

  // 최종 표시할 회원 목록
  const sortedMembers = [...nowActiveMembers, ...recentActiveMembers, ...otherMembers];

  return (
    <MemberListContainer>
      {sortedMembers.map((member, index) => (
        <ListItem key={index}>
          {member.generation}기 {member.name}
          <ActiveStatus isActive={member.isActive} />
        </ListItem>
      ))}
    </MemberListContainer>
  );
};

export default MemberStatusList;
