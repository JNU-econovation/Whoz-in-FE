import { useState, useEffect } from 'react';
import { getMemberFromCache, fetchAndUpdateMemberCache } from '../api/storeMemberInfo';


export const useMemberInfo = (memberId) => {
    const [memberInfo, setMemberInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadData = async () => {
            setIsLoading(true);
            try {
                // 로컬 캐시에서 이전 데이터를 먼저 읽어와 화면에 보여주기
                console.log(memberId);
                const cachedData = getMemberFromCache(memberId);
                if (cachedData) {
                    setMemberInfo(cachedData);
                }

                // 서버에 최신 정보를 요청하고 캐시를 업데이트
                const freshData = await fetchAndUpdateMemberCache(memberId);

                // 최신 정보를 화면 업데이트
                if (freshData) {
                    setMemberInfo(freshData);
                }

                if(!cachedData && !freshData) {
                    throw new Error("사용자 정보를 불러올 수 없습니다");
                }

            } catch (err) {
                console.error(`[${memberId || '내'}] memberInfo 로드 중 에러 발생:`, err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [memberId]);

    return { memberInfo, isLoading, error };
};