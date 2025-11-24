let isRefreshing = false;
let reissuePromise = null;

const reissue = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/v1/reissue`, {
        method: "POST",
        credentials: "include",
    }).then((res) => {
        if (!res.ok) {
            window.location.href = "/beta-login";
            throw new Error("토큰 재발급에 실패했습니다.");
        }
    });
};

export async function customFetch(url, options = {}) {
    const fetchWithCookie = () =>
        fetch(url, {
            ...options,
            credentials: "include",
        });

    if (isRefreshing) {
        await reissuePromise;
    }

    let response = await fetchWithCookie();

    const clone = response.clone();
    let data = null;
    try {
        data = await clone.json();
    } catch {
    }

    if (data?.error_code === "2000") {
        if (!isRefreshing) {
            isRefreshing = true;
            reissuePromise = reissue();
        }

        try {
            await reissuePromise;
        } finally {
            isRefreshing = false;
            reissuePromise = null;
        }

        return await customFetch(url, options);
    }

    if (!response.ok) {
        if (data && data.error_code) {
            throw new Error(data.message);
        }

        throw new Error(`알 수 없는 오류가 발생했습니다.`);
    }

    return response;
}