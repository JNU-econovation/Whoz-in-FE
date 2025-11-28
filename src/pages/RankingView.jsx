import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

export const RANKING_CONFIG = [
    { type: 'MONTHLY_TIME', title: '월간 재실 시간' },
    { type: 'MAX_STREAK', title: '연속 출석 일수' },
    { type: 'TOTAL_TIME', title: '누적 재실 시간' },
    { type: 'TOTAL_ATTENDANCE', title: '누적 출석 일수' }
];

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  padding-bottom: 3rem;
`;

const RankingSection = styled.div`
  padding: 0rem 0.5rem 0.5rem 0;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.1rem 0;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DropdownContainer = styled.div`
  position: relative;
  min-width: 80px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: inherit;
  width: 100%;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  &:hover {
    background-color: #f9f9f9;
  }
  
  span {
      white-space: nowrap;
    position: relative;
    top: 1px;
  }

  &::after {
    content: '';
    width: 0; 
    height: 0; 
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #8e8e93;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.2s;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  padding: 0;
  list-style: none;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
  min-width: 100px;
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 2px;
  }
`;

const DropdownItem = styled.li`
  padding: 10px 16px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
  white-space: nowrap;

  &:hover {
    background-color: #f0f2f5;
  }

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  ${({ isSelected }) => isSelected && css`
    color: #2a86ff;
    font-weight: 700;
    background-color: #eef5ff;
  `}
`;

const RankingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MedalContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  position: relative;

  ${({ rank }) => {
    if (rank <= 3) {
        return css`
            color: white;
            background-color: ${rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32'};
            
            &::before {
                position: absolute;
                top: -8px;
                font-size: 1rem;
                color: #A9A9A9;
                transform: scaleY(0.7);
            }
        `;
    }
    else {
        return css`
            color: #8E8E93;
            background-color: transparent;
        `;
    }
}}
`;

const RankItem = styled.li`
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;

  .rank-badge-container {
    justify-self: center;
    font-size: 1rem;
    font-weight: 600;
  }

  .rank-name {
    justify-self: start;
    font-weight: 600;
    color: #333;

    ${({ isMe }) => isMe && css`
        color: #2A86FF;
    `}
  }

  .rank-record {
    justify-self: end;
    font-weight: 600;
    color: #555;

    ${({ isMe }) => isMe && css`
        color: #2A86FF;
    `}
  }
`;

const ThinSeparator = styled.div`
    height: 1px;
    background-color: #f0f0f0;
    margin: 0.5rem 0;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: #8e8e93;
`;


const Medal = ({ rank }) => (
    <MedalContainer rank={rank}>{rank}</MedalContainer>
);

const GenerationDropdown = ({ generations, currentGen, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (gen) => {
        onSelect(gen);
        setIsOpen(false);
    };

    return (
        <DropdownContainer ref={containerRef}>
            <DropdownButton
                onClick={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            >
                <span>{currentGen ? `${currentGen}기` : '전체'}</span>
            </DropdownButton>

            {isOpen && (
                <DropdownList>
                    <DropdownItem
                        onClick={() => handleSelect(null)}
                        isSelected={currentGen === null}
                    >
                        전체
                    </DropdownItem>

                    {generations.map((gen) => (
                        <DropdownItem
                            key={gen}
                            onClick={() => handleSelect(gen)}
                            isSelected={currentGen === gen}
                        >
                            {gen}기
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </DropdownContainer>
    );
};

const RankingCard = ({ title, type, rankingData, generations, currentUser, onFilterChange }) => {
    const [selectedGen, setSelectedGen] = useState(null);

    const handleGenerationSelect = (gen) => {
        setSelectedGen(gen);
        if (onFilterChange) {
            onFilterChange(type, gen);
        }
    };

    return (
        <RankingSection>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {generations && generations.length > 0 && (
                    <GenerationDropdown
                        generations={generations}
                        currentGen={selectedGen}
                        onSelect={handleGenerationSelect}
                    />
                )}
            </CardHeader>

            <RankingList>
                {rankingData.map((user) => {
                    const isMe = user.is_me;
                    return (
                        <RankItem key={user.rank} isMe={isMe}>
                            <div className="rank-badge-container">
                                <Medal rank={user.rank} />
                            </div>
                            <span className="rank-name">{user.generation}기 {user.member_name}</span>
                            <span className="rank-record">{user.content}</span>
                        </RankItem>
                    );
                })}
            </RankingList>
        </RankingSection>
    );
};

const RankingView = ({ rankings, loading, currentUser, onFilterChange }) => {
    if (loading && !rankings) return <LoadingMessage></LoadingMessage>;
    if (!rankings) return <LoadingMessage>랭킹 정보가 없습니다.</LoadingMessage>;

    return (
        <RankingContainer>
            {RANKING_CONFIG.map((config, index) => {
                const data = rankings[config.type];
                if (!data || !data.members) return null;

                return (
                    <React.Fragment key={config.type}>
                        <RankingCard
                            title={config.title}
                            type={config.type}
                            rankingData={data.members}
                            generations={data.generations}
                            currentUser={currentUser}
                            onFilterChange={onFilterChange}
                        />
                        {index < RANKING_CONFIG.length - 1 && <ThinSeparator />}
                    </React.Fragment>
                );
            })}
        </RankingContainer>
    );
};

export default RankingView;