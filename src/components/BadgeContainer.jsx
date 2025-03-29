import React from "react";
import styled from "styled-components";
import Badge from "./Badge";
import { useBadges } from "../hooks/useBadges";

const Container = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  margin-left: 0.5rem;
`;

const BadgeContainer = ({ memberId }) => {
  const { badges } = useBadges(memberId);


  return (
    <Container>
      {badges.map((badge) => (
        <Badge key={badge.id} text={badge.name} color={badge.color} />
      ))}
    </Container>
  );
};

export default BadgeContainer;
