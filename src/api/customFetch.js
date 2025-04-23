let isRefreshing = false;
let reissuePromise = null;
let requestQueue = [];

const reissue = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/v1/reissue`, {
        method: "POST",
        credentials: "include",
    }).then((res) => {
        if (!res.ok) {
            throw new Error("리이슈 실패");
        }
    });
};

export async function customFetch(url, options = {}) {
    const fetchWithCookie = () =>
        fetch(url, {
            ...options,
            credentials: "include",
        });

    // reissue 중이면 기다림
    if (isRefreshing) {
        await reissuePromise;
    }

    let response = await fetchWithCookie();

    const clone = response.clone();
    let data = null;
    try {
        data = await clone.json();
    } catch {}

    if (data?.error_code === "2000") {
        if (!isRefreshing) {
            isRefreshing = true;
            reissuePromise = reissue();
        }

        try {
            await reissuePromise;
        } catch {
            window.location.href = "/beta-login";
            return;
        } finally {
            isRefreshing = false;
            reissuePromise = null;
        }

        return await customFetch(url, options); // 이전 요청 다시 시도
    }

    return response;
}
