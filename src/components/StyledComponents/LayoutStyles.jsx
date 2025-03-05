import styled from "styled-components";

export const ListContainer = styled.div`
display: flex ;
flex-direction: column;
gap: 3rem;
padding: 3rem;
background-color: white;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  justify-content: space-between;
  cursor: pointer; 
  &:hover {
    color: gray; 
  }
`;

export const ContentContainer = styled.div`
  gap: 3rem;
  padding:3rem;
`;

export const ContentWrapper = styled.div`
  position: relative;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const UpperMessage = styled.div`
  font-size: 2rem;
  font-family: 'Pretendard-medium', sans-serif;
  color: #101740;
  text-align: left;
  padding: 2rem ;
  padding-top: 4rem;

`;

export const UpperContainer = styled.div`
// 상단 컨테이너 (상단 메세지 + 추가 버튼)
display: flex;
align-items: center;
justify-content: space-between;
padding-right: 1rem;

`
