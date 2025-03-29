import React from "react";
import styled from "styled-components";

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

// ✅ 고정 배열 + 날짜 기준으로 추가
const getGenerations = () => {
    const baseGenerations = Array.from({ length: 28 - 11 + 1 }, (_, i) => 11 + i); // 11~28기
    const today = new Date();
    const currentYear = today.getFullYear();

    // 기준 날짜들
    const march20 = new Date(currentYear, 2, 20); // 3월 20일
    const september20 = new Date(currentYear, 8, 20); // 9월 20일

    let extraCount = 0;
    if (today >= march20) extraCount++;
    if (today >= september20) extraCount++;

    const latestGeneration = 28 + extraCount;

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
