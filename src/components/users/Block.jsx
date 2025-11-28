import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { customFetch } from '../../api/customFetch';

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const START_YEAR = 2025;
const START_MONTH = 4;
const START_DAY = 14;

const BlockContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const BlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 0.3rem;
`;

const NavButton = styled.button`
  font-size: 1.25rem;
  padding: 0 0.5rem;
  color: ${({ disabled }) => (disabled ? '#A0AEC0' : '#1A202C')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: none;
  border: none;
`;

const MonthLabel = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 1.2rem;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2.3rem);
  gap: 0.25rem;
`;

const DayBlock = styled.div`
  width: 2.3rem;
  height: 2.3rem;
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

const StartText = styled.span`
  font-size: 0.6rem;
  font-weight: bold;
  color: #718096;
  text-align: center;
  line-height: 1.3;
`;

// 오전 6시 이전은 어제, 오전 6시 이후가 오늘
const getWhozinToday = () => {
    const now = new Date();
    const adjusted = new Date(now);
    if (now.getHours() < 6) {
        adjusted.setDate(now.getDate() - 1);
    }
    return adjusted;
};

const Block = ({ memberId }) => {
    const today = getWhozinToday();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [data, setData] = useState([]);
    const [activeTimeMap, setActiveTimeMap] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalActiveTime, setTotalActiveTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setActiveTimeMap({});
            setTotalActiveTime('');
            setData([]);
            try {
                const res = await customFetch(`${BASE_URL}/api/v1/members/${memberId}/block?year=${year}&month=${month}`);
                const json = await res.json();
                const map = {};
                if (json.data && json.data.days) {
                    json.data.days.forEach(day => {
                        map[day.day] = day.active_time;
                    });
                }
                setActiveTimeMap(map);
                setData(json);
                if (json.data) {
                    setTotalActiveTime(json.data.total_active_time);
                }
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

        const isCurrentMonth = year === today.getFullYear() && month === today.getMonth() + 1;
        const isStartMonth = year === START_YEAR && month === START_MONTH;

        for (let i = 0; i < firstDay; i++) {
            blocks.push(<div key={`empty-${i}`} />);
        }

        for (let day = 1; day <= lastDate; day++) {
            if (isStartMonth && day < START_DAY) {
                blocks.push(
                    <DayBlock
                        key={day}
                        hasTime={false}
                        style={{ opacity: 0.2 }}
                    >
                        <DayNumber>{day}</DayNumber>
                    </DayBlock>
                );
                continue;
            }

            if (isStartMonth && day === START_DAY) {
                blocks.push(
                    <DayBlock key={day} hasTime={false} loading={loading}>
                        <StartText>기록<br />시작</StartText>
                    </DayBlock>
                );
                continue;
            }

            const time = activeTimeMap[day];
            const dayIndex = (firstDay + day - 1) % 7;
            const isSunday = dayIndex === 0;
            const isSaturday = dayIndex === 6;

            let color = 'black';
            if (isSunday) color = '#E53E3E';
            else if (isSaturday) color = '#3182CE';

            const isFuture = isCurrentMonth && day > today.getDate();

            blocks.push(
                <DayBlock
                    key={day}
                    hasTime={!!time && !isFuture}
                    loading={loading}
                    style={{ opacity: isFuture ? 0.5 : 1 }}
                >
                    <DayNumber style={{ color: isFuture ? '#CBD5E0' : color }}>{day}</DayNumber>
                    {!isFuture && time && <ActiveTime>{time}</ActiveTime>}
                </DayBlock>
            );
        }

        return blocks;
    };

    const canGoNext = year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1);
    const canGoPrev = year > START_YEAR || (year === START_YEAR && month > START_MONTH);

    const goPrevMonth = () => {
        if (!canGoPrev) return;
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
                    <NavButton onClick={goPrevMonth} disabled={!canGoPrev}>{'‹'}</NavButton>
                    <MonthLabel>{month}월</MonthLabel>
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