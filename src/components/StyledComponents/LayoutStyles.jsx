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
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  color: white;
  text-align: left;
  padding: 2rem ;
  padding-top: 4rem;
`;