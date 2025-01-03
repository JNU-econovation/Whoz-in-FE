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
