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
const getGenerations = () => {
    const baseDate = new Date(2017, 4, 1); // 2017년 5월 1일 (월은 0부터 시작)
    const baseGeneration = 11;

    const today = new Date();

    // 몇 개월 차이인지 계산
    const diffYears = today.getFullYear() - baseDate.getFullYear();
    const diffMonths = today.getMonth() - baseDate.getMonth();
    const totalMonths = diffYears * 12 + diffMonths;

    // 5월, 10월에만 기수 증가 -> 6개월마다 증가
    const generationCount = Math.floor(totalMonths / 6);

    const latestGeneration = baseGeneration + generationCount;

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