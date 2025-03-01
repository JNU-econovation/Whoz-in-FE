export function customFetch(url, options = {}) {

    return fetch(url, {
        ...options,
        credentials: "include" // withCredentials 옵션 추가
    })
    .then(async (response) => {
        const clone = response.clone(); // 응답 복사
        let data = null;
        try {
            data = await clone.json();
        } catch (jsonError) { // JSON 변환 실패 시 텍스트 읽기
            const errorText = await response.text();
            console.warn("JSON 파싱 실패, 응답이 JSON이 아닐 가능성이 있음:", errorText);
            return errorText;
        }
        // 인증 필요하면 로그인 페이지로 리디렉션
        if (data?.error_code === "2001") {
            window.location.href = "/beta-login";
        }
        return response; // JSON 데이터 반환
    })
    .catch((error) => {
        console.error("API 요청 실패:", error);
        throw error;
    });
}