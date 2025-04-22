import React, { useEffect, useState } from 'react';
import { customFetch } from '../../api/customFetch';

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL

const Block = ({ memberId }) => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1); // 1-based
    const [data, setData] = useState([]);
    const [activeTimeMap, setActiveTimeMap] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await customFetch(`${BASE_URL}/api/v1/members/${memberId}/block?year=${year}&month=${month}`);
            const json = await res.json();
            const map = {};
            json.data.days.forEach(day => {
                map[day.day] = day.active_time;
            });
            setActiveTimeMap(map);
            setData(json);
        };

        fetchData();
    }, [memberId, year, month]);

    const renderCalendar = () => {
        const firstDay = new Date(year, month - 1, 1).getDay();
        const lastDate = new Date(year, month, 0).getDate();
        const blocks = [];

        for (let i = 0; i < firstDay; i++) {
            blocks.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
        }

        for (let day = 1; day <= lastDate; day++) {
            const time = activeTimeMap[day];
            blocks.push(
                <div key={day} className="w-12 h-12 border rounded flex flex-col items-center justify-center bg-gray-100">
                    <span className="text-sm font-bold">{day}</span>
                    {time && <span className="text-xs text-blue-600">{time}</span>}
                </div>
            );
        }

        return blocks;
    };

    const canGoNext = year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
                <button
                    onClick={() => setMonth(prev => (prev === 1 ? (setYear(y => y - 1), 12) : prev - 1))}
                    className="text-xl px-2"
                >
                    {'<'}
                </button>
                <span className="text-lg font-semibold">{month}월 블록</span>
                <button
                    onClick={() => {
                        if (canGoNext) setMonth(prev => (prev === 12 ? (setYear(y => y + 1), 1) : prev + 1));
                    }}
                    disabled={!canGoNext}
                    className={`text-xl px-2 ${!canGoNext ? 'text-gray-400 cursor-not-allowed' : ''}`}
                >
                    {'>'}
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="w-12 h-6 text-center text-sm font-medium text-gray-500">{d}</div>
                ))}
                {renderCalendar()}
            </div>
        </div>
    );
};

export default Block;
