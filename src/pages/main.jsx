import React from 'react';
import ReactDOM from 'react-dom';
import MemberStatusList from '../components/MemberStatusList';
import members from '../data/sampleData';
import styled from 'styled-components';

// Main 페이지의 상단 그라데이션 배경과 메시지를 포함하는 컴포넌트
const MainWrapper = styled.div`
  background: linear-gradient(80deg, #b5d8f6 0%, #dab5f6 100%);
  padding-top: 3rem;
  padding-bottom: 3rem; 
`;

const UpperMessage = styled.div`
  font-size: 2rem;
  
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  color: black;
  text-align: left;
  padding: 2rem ;
`;

const Main = () => {
  // 현재 동방에 있는 인원 수 계산
  const nowActiveMembers = members.filter(member => member.isActive);
  
  return (
    <MainWrapper>
      <UpperMessage>
        현재 동방에
        <br />
        <b>{nowActiveMembers.length}</b>명 있습니다.
      </UpperMessage>
      <MemberStatusList members={members} />
    </MainWrapper>
  );
};

export default Main;
