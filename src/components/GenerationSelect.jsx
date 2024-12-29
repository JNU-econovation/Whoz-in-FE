import React from "react";
import styled from "styled-components";

export const StyledSelect = styled.select`
    height: 4rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    width: 100%;
    max-width: 25rem;
    box-sizing: border-box;

&:focus {
  border-color: #007bff;
  outline: none;
}
`

