import { storeMemberInfo } from './storeMemberInfo'; // 상대 경로는 환경에 맞게 조정하세요

export const getMemberInfo = async () => {
    try {
        const data = localStorage.getItem('memberInfo');

        if (data) {
            return JSON.parse(data);
        } else {
            const updatedInfo = await storeMemberInfo();
            return updatedInfo;
        }
    } catch (err) {
        console.error('memberInfo 읽기 실패:', err);
        return null;
    }
};