export function customFetch(url, options = {}) {

    return fetch(url, {
        ...options,
        credentials: "include" // withCredentials 옵션 추가
    })
    .then((response) => {
        const clone = response.clone()
        clone.json().then((data)=>{
            if (data.error_code === "2001") {
                // alert(data.error_code)
                window.location.href = "/beta-login";
                return Promise.reject(new Error("Unauthorized, Redirecting..."));
            }
        })
        return response;
    })
    .catch((error) => {
        console.error("API 요청 실패:", error);
        throw error;
    });
}