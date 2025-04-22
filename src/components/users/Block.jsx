import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { customFetch } from '../../api/customFetch';

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const BlockContainer = styled.div`
  width: fit-content;
  //padding: 1rem;
  //border: 2.5px solid #d9dee4;
  //border-radius: 2rem;
  //box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
  margin-left: auto;
  margin-right: auto;
`;


const BlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
`;


const NavButton = styled.button`
  font-size: 1.25rem;
  padding: 0 0.5rem;
  color: ${({ disabled }) => (disabled ? '#A0AEC0' : '#1A202C')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: none;
  border: none;
  //font-weight: bold;
`;

const MonthLabel = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  //border: 1px solid #eaedef;
  border-radius: 1.2rem;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2.3rem);
  gap: 0.25rem;
`;

const DayLabel = styled.div`
  width: 2.3rem;
  height: 1.15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #718096;
`;

const DayBlock = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  //border: 1px solid #E2E8F0;
  border-radius: 0.8rem;
  background-color: ${({ hasTime }) => (hasTime ? 
      '#b5d8f6' : 
      '#F7FAFC')
};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ loading }) => (loading ? 0.3 : 1)};
`;

const DayNumber = styled.span`
  font-size: 0.625rem;
  font-weight: bold;
  color: #718096;
`;

const ActiveTime = styled.span`
  font-size: 0.75rem;
  color: #5e5e5e;
`;

const Block = ({ memberId }) => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [data, setData] = useState([]);
    const [activeTimeMap, setActiveTimeMap] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalActiveTime, setTotalActiveTime] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await customFetch(`${BASE_URL}/api/v1/members/${memberId}/block?year=${year}&month=${month}`);
                const json = await res.json();
                const map = {};
                json.data.days.forEach(day => {
                    map[day.day] = day.active_time;
                });
                setActiveTimeMap(map);
                setData(json);
                setTotalActiveTime(json.data.total_active_time);
            } catch (err) {
                console.error('데이터 로딩 실패:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [memberId, year, month]);

    const renderCalendar = () => {
        const firstDay = new Date(year, month - 1, 1).getDay();
        const lastDate = new Date(year, month, 0).getDate();
        const blocks = [];

        for (let i = 0; i < firstDay; i++) {
            blocks.push(<div key={`empty-${i}`} />);
        }

        for (let day = 1; day <= lastDate; day++) {
            const time = activeTimeMap[day];
            const dayIndex = (firstDay + day - 1) % 7;
            const isSunday = dayIndex === 0;
            const isSaturday = dayIndex === 6;

            let color = 'black';
            if (isSunday) color = '#E53E3E';     // 빨간색
            else if (isSaturday) color = '#3182CE'; // 파란색

            blocks.push(
                <DayBlock key={day} hasTime={!!time} loading={loading}>
                    <DayNumber style={{ color }}>{day}</DayNumber>
                    {time && <ActiveTime>{time}</ActiveTime>}
                </DayBlock>
            );
        }

        return blocks;
    };

    const canGoNext = year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1);

    const goPrevMonth = () => {
        setMonth(prev => {
            if (prev === 1) {
                setYear(y => y - 1);
                return 12;
            }
            return prev - 1;
        });
    };

    const goNextMonth = () => {
        if (canGoNext) {
            setMonth(prev => {
                if (prev === 12) {
                    setYear(y => y + 1);
                    return 1;
                }
                return prev + 1;
            });
        }
    };

    return (
        <BlockContainer>
            <BlockHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <NavButton onClick={goPrevMonth}>{'‹'}</NavButton>
                    <MonthLabel>{month}월 블록</MonthLabel>
                    <NavButton onClick={goNextMonth} disabled={!canGoNext}>{'›'}</NavButton>
                </div>

                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    {totalActiveTime}
                </div>
            </BlockHeader>

            <CalendarWrapper>
                <CalendarGrid>
                    {renderCalendar()}
                </CalendarGrid>
            </CalendarWrapper>
        </BlockContainer>
    );
};

export default Block;
