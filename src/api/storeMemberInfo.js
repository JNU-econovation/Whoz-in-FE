import { customFetch } from '../api/customFetch';

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;
const CACHE_KEY = 'memberCache'; // 여러 멤버 정보를 저장할 키 이름 변경

// 서버에서 특정 멤버의 정보를 가져오는 역할
const fetchMemberFromServer = async (memberId) => {
    try {
        const apiUrl = `${BASE_URL}/api/v1/members/${memberId}/profile`;
        const response = await customFetch(apiUrl);
        const json = await response.json();

        if (json.data) {
            return {
                id: json.data.member_id,
                name: json.data.member_name,
                generation: json.data.generation,
                position: json.data.position,
                profile_image_url: json.data.profile_image_url,
            };
        }
        return null;
    } catch (error) {
        console.error(`프로필 정보를 서버에서 불러오는 데 실패했습니다:`, error);
        throw error;
    }
};

// 로컬 스토리지에서 모든 멤버 캐시를 읽어오는 역할
const getCache = () => {
    try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        return cachedData ? JSON.parse(cachedData) : {};
    } catch (e) {
        return {};
    }
};

// 특정 멤버의 정보를 로컬 스토리지에서 읽어옴
export const getMemberFromCache = (memberId) => {
    if (!memberId) return null;
    const cache = getCache();
    return cache[memberId] || null;
};

// 특정 멤버의 정보를 서버에서 가져와 캐시를 업데이트
export const fetchAndUpdateMemberCache = async (memberId) => {
    try {
        const freshData = await fetchMemberFromServer(memberId);
        if (freshData && freshData.id) {
            const cache = getCache();
            cache[freshData.id] = freshData; // freshData.id를 키로 사용
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
            return freshData;
        }
        return null;
    } catch (error) {
        // 에러가 발생해도 함수는 null을 반환하여 앱 중단을 막습니다.
        return null;
    }
};