import React from "react"
import styled from "styled-components"

export const StyledSelect = styled.select`
    height: 4rem;
    border: none;
    background-color: #ededed;
    color: #242424;
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
`;

const BASE_GENERATION = 31;
const BASE_YEAR = 2026;

const getHalfYearIndex = (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const isSecondHalf = month > 6 || (month === 6 && day >= 1);
    return date.getFullYear() * 2 + (isSecondHalf ? 1 : 0);
};

const getGenerations = () => {
    const today = new Date();
    const baseDate = new Date(BASE_YEAR, 0, 1);
    const halfYearOffset = getHalfYearIndex(today) - getHalfYearIndex(baseDate);
    const latestGeneration = BASE_GENERATION + halfYearOffset;

    const generations = [];
    for (let i = latestGeneration; i >= 11; i--) {
        generations.push(i);
    }
    return generations;
};

// ✅ 드롭다운 컴포넌트
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
