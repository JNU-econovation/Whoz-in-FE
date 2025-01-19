export function customFetch(url, options = {}) {

    return fetch(url, {
        ...options,
        credentials: "include" // withCredentials 옵션 추가
    })
    .then((response) => {
        const data = response.clone().json();
        // alert("zz")
        // error_code가 2001이면 로그인 페이지로 이동
        if (data.error_code === "2001") {
            window.location.href("/beta-login");
            return Promise.reject(new Error("Unauthorized, Redirecting..."));
        }
        return response;
    })
    .catch((error) => {
        console.error("API 요청 실패:", error);
        throw error;
    });
}