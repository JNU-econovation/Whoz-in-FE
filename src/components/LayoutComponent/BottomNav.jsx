import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const NavContainer = styled.bar `
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
    padding: 1rem;
     text-align: center;
     font-size: 1.5rem;
     font-weight: bold;
      border-top: 0.1rem gray solid;
`

function BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    return (
        <NavContainer>
        </NavContainer>
    )
}