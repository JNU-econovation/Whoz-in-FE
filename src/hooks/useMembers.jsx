import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../api/customFetch';
import { useLoading } from '../context/LoadingContext';

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

export const useMembers = () => {
    const { setLoading } = useLoading();

    return useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            setLoading(true); // 로딩 시작
            try {
                const res = await customFetch(`${BASE_URL}/api/v1/members?page=1&size=100&sortType=asc`);
                const data = await res.json();
                if (data.error_code === "3060") throw new Error('NEED_REGISTRATION');
                return data.data.members;
            } finally {
                setLoading(false); // 로딩 끝
            }
        },
        staleTime: Infinity,
        refetchOnMount: 'always', // 캐시있어도 마운트될때마다 무조건 새로고침
        refetchInterval: 60 * 1000, // 1분마다 새로고침
        refetchIntervalInBackground: false, // 백그라운드에선 fetch x
        keepPreviousData: true,
    });
};
