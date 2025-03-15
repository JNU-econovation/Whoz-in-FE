import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { ListContainer, ListItem } from "./StyledComponents/LayoutStyles";

const ClickableArea = styled.div`
  display: flex;
  align-items: center;
  width:5rem;
  min-height: 1rem;
  height: 1rem;
  padding: 0.5rem 1rem; 
  cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
`;

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
  min-height: 35rem;
  margin-bottom: 2.5rem;
  padding-bottom: 7rem;
`;

const RegisterNotice = styled.div`
  font-size: 1.2rem;
  color: #5b5b5b;
  text-align: center;
  padding-top: 3rem;
`;

const MemberStatusList = ({ members, registrationNeeded }) => {
  const [showTime, setShowTime] = useState([]);

  useEffect(() => {
    setShowTime((prevShowTime) => {
      const newShowTime = {};
      members.forEach((member) => {
        newShowTime[member.member_id] = prevShowTime[member.member_id] || false;
      });
      return newShowTime;
    });
  }, [members]);

  const toggleShowTime = (member_id) => {
    setShowTime((prev) => ({
      ...prev,
      [member_id]: !prev[member_id],
    }));
  };

  if (registrationNeeded) {
    return (
      <MemberListContainer>
        <RegisterNotice>기기 등록을 먼저 진행해주세요.</RegisterNotice>
      </MemberListContainer>
    );
  }

  return (
    <MemberListContainer>
      {members.map((member, index) => (
        <ListItem key={index}>
          {member.generation}기 {member.member_name}
          <ClickableArea
            isActive={member.is_active}
            onClick={() => toggleShowTime(member.member_id)}
          >
            {showTime[member.member_id] ? (
              <ActiveTime>{member.total_active_time}</ActiveTime>
            ) : (
              <ActiveStatus isActive={member.is_active} />
            )}
          </ClickableArea>
        </ListItem>
      ))}
    </MemberListContainer>
  );
};

export default MemberStatusList;