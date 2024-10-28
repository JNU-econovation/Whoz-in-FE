import React from "react";
import styled from "styled-components";

// 활동 상태 초록불
const ActiveStatus = styled.div `
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? 'green' : 'gray')};
  margin-left: auto;
`;

const ListContainer = styled.div`
    display:flex ;
    flex-direction: column;
    gap: 2rem;
    padding: 4rem;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center

`;

const MemberStatusList = ({members}) => {
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
  <ListContainer>
    {sortedMembers.map((member, index) => (
      <MemberItem key={index}>
        {member.generation}기 {member.name}
        <ActiveStatus isActive={member.isActive} />
      </MemberItem>
    ))}
  </ListContainer>
);
};

export default MemberStatusList;
  