import React, { useEffect, useState } from "react"
import MemberStatusList from '../components/MemberStatusList';
import styled from 'styled-components';
import SnowAnimation from '../components/StyledComponents/SnowyEffect';
// TODO: 멤버 활성 상태 통신 api 구현 및 연결
import { ContentContainer, ContentWrapper } from '../components/StyledComponents/LayoutStyles';
import { customFetch } from "../api/customFetch"
import { UpperMessage } from "../components/StyledComponents/LayoutStyles";

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



const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const Main = () => {
  const [members, setMembers] = useState([]); // 멤버 리스트 상태
  const [activeCount, setActiveCount] = useState();

  const fetchMembers = async () => {
    try {
      const response = await customFetch(`${BASE_URL}/api/v1/members?page=1&size=10&sortType=asc`);
      const data = await response.json();
      const members = data.data.members;
      if (members) {
        setMembers(members);
        const activeMembers = members.filter(member => member.is_active).length;
        setActiveCount(activeMembers);
      }
    } catch (error) {
      console.error("멤버 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchMembers(); // 최초 데이터 요청
    const interval = setInterval(fetchMembers, 60000);
    return () => clearInterval(interval);
  }, []);

    return (
      <>
        <PersistentBackground/>
        <ContentWrapper >
          <UpperMessage>
            현재 동방에
            <br />
            <b>{activeCount}</b>명 있습니다 ☃️
          </UpperMessage>
          <MemberStatusList members={members} />
        </ContentWrapper>
      </>
    );
  };

  const PersistentBackground = React.memo(() => (
      <Background>
        {<SnowAnimation count={40} />}
      </Background>
  ));


export default Main;