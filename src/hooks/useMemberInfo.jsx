import { useState, useEffect } from 'react';
import { getMemberFromCache, fetchAndUpdateMemberCache } from '../api/storeMemberInfo';
import { useAuth } from '../context/AuthContext';

export const useMemberInfo = (memberId) => {
    const { userInfo, ensureCurrentMember } = useAuth();
    const effectiveMemberId = memberId ?? userInfo.memberId ?? null;
    const [memberInfo, setMemberInfo] = useState(() => {
        return getMemberFromCache(effectiveMemberId);
    });
    const [isLoading, setIsLoading] = useState(Boolean(effectiveMemberId));
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setIsLoading(true);
            try {
                const resolvedMemberId = effectiveMemberId ?? (await ensureCurrentMember());
                if (!resolvedMemberId) {
                    if (isMounted) {
                        setMemberInfo(null);
                        setError(new Error("사용자 식별자를 확인할 수 없습니다"));
                    }
                    return;
                }

                const cachedData = getMemberFromCache(resolvedMemberId);
                if (cachedData && isMounted) {
                    setMemberInfo(cachedData);
                }

                // 서버에 최신 정보를 요청하고 캐시를 업데이트
                const freshData = await fetchAndUpdateMemberCache(resolvedMemberId);

                // 서버에서 가져온 데이터가 있고, 기존 데이터와 다르다면 업데이트
                if (freshData && isMounted) {
                    setMemberInfo(freshData);
                }

                // 캐시도 없고 서버 데이터도 없으면 에러
                if (!cachedData && !freshData) {
                    throw new Error("사용자 정보를 불러올 수 없습니다");
                }

            } catch (err) {
                console.error(`[${effectiveMemberId || '내'}] memberInfo 로드 중 에러 발생:`, err);
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        setError(null);
        loadData();

        return () => {
            isMounted = false;
        };
    }, [effectiveMemberId, ensureCurrentMember]);

    return { memberInfo, isLoading, error };
};
