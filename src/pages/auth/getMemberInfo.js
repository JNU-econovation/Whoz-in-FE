export const getMemberInfo = () => {
    try {
        const data = localStorage.getItem('memberInfo');
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error('memberInfo 읽기 실패:', err);
        return null;
    }
};
