import React from 'react';
// import ReactDOM from 'react-dom';
import MemberStatusList from '../components/MemberStatusList';
import members from '../data/sampleData';
import styled from 'styled-components';
import SnowAnimation from '../components/StyledComponents/SnowyEffect';
// TODO: 멤버 활성 상태 통신 api 구현 및 연결

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 150vh; 
  /*background: linear-gradient(80deg, #b5d8f6 0%, #dab5f6 100%);*/
  background: linear-gradient(120deg, #000000, #abbaff);
  z-index: -1;
  
`;

const ContentWrapper = styled.div`
  position: relative;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const UpperMessage = styled.div`
  font-size: 2rem;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  color: white;
  text-align: left;
  padding: 2rem ;
  padding-top: 4rem;
`;

const Main = () => {
  // 현재 동방에 있는 인원 수 계산
  const nowActiveMembers = members.filter(member => member.isActive);
  

    return (
      <>
        <Background>
          <SnowAnimation count={50} />
          </Background>
        <ContentWrapper>
          <UpperMessage>
            현재 동방에
            <br />
            <b>{nowActiveMembers.length}</b>명 있습니다 ☃️
          </UpperMessage>
          <MemberStatusList members={members} />
        </ContentWrapper>
      </>
    );
  };
  

export default Main;
