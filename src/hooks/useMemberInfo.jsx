import { useState, useEffect } from 'react';
import { getMemberFromCache, fetchAndUpdateMemberCache } from '../api/storeMemberInfo';

export const useMemberInfo = (memberId) => {
    const [memberInfo, setMemberInfo] = useState(() => {
        return getMemberFromCache(memberId);
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cachedData = getMemberFromCache(memberId);
        if (cachedData) {
            setMemberInfo(cachedData);
        }

        const loadData = async () => {
            setIsLoading(true);
            try {
                // 서버에 최신 정보를 요청하고 캐시를 업데이트
                const freshData = await fetchAndUpdateMemberCache(memberId);

                // 서버에서 가져온 데이터가 있고, 기존 데이터와 다르다면 업데이트
                if (freshData) {
                    setMemberInfo(freshData);
                }

                // 캐시도 없고 서버 데이터도 없으면 에러
                if (!cachedData && !freshData) {
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