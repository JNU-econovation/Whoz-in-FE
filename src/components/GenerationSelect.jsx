import React from "react";
import styled from "styled-components";

export const StyledSelect = styled.select`
    height: 4rem;
    border: none;
    background-color: #ededed;
    color:#a3a3a3;
    margin-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 1.5rem;
    font-size: 1.2rem;
    width: 100%;
    max-width: 25rem;
    box-sizing: border-box;

&:focus {
  border-color: #007bff;
  outline: none;
}
`
// 자동화
const getGenerations = () => {
    const baseYear = 2017;
    const baseMonth = 5; // 5월
    const baseGeneration = 11;

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let generationCount = (currentYear - baseYear) * 2;

    if (currentMonth > 10 || (currentMonth === 10 && currentDay >= 1)) {
        generationCount += 2;
    } else if (currentMonth > 5 || (currentMonth === 5 && currentDay >= 1)) {
        generationCount += 1;
    }

    const latestGeneration = baseGeneration + generationCount - 1;

    const generations = [];
    for (let i = latestGeneration; i >= baseGeneration; i--) {
        generations.push(i);
    }
    return generations;
};


// 드롭다운 컴포넌트
const GenerationsDropdown = ({ generation, setGeneration }) => {
    const generations = getGenerations();

    return (
        <StyledSelect
            value={generation}
            onChange={(e) => setGeneration(e.target.value)}
        >
            <option value="">기수를 선택하세요</option>
            {generations.map((gen) => (
                <option key={gen} value={gen}>
                    {gen}
                </option>
            ))}
        </StyledSelect>
    );
};

export default GenerationsDropdown;