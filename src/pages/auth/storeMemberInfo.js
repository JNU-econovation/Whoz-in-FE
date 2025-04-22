import { customFetch } from "../../api/customFetch";

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

export const storeMemberInfo = async () => {
    try {
        const response = await customFetch(BASE_URL + '/api/v1/member');
        const json = await response.json();

        if (json.data) {
            const memberInfo = {
                name: json.data.name,
                generation: json.data.generation,
                position: json.data.position,
                // statusMessage: json.data.statusMessage,
                profilePic: json.data.profilePic || null,
            };

            localStorage.setItem('memberInfo', JSON.stringify(memberInfo));

            return memberInfo;
        }
    } catch (error) {
        console.error('내 프로필 정보를 불러오는 데 실패했습니다:', error);
        return null;
    }
};
