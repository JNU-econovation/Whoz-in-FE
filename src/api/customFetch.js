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
        } catch (jsonError) {
            // console.log("응답 바디가 JSON이 아님");
        }

        // 인증 필요하면 로그인 페이지로 리디렉션
        if (data?.error_code === "2000") {
            window.location.href = "/beta-login";
        }

        return response;
    })
    .catch((error) => {
        console.error("API 요청 실패:", error);
        throw error;
    });
}