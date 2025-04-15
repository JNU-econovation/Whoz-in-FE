const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export function register(config) {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) return;

        window.addEventListener("load", () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            navigator.serviceWorker
            .register(swUrl)
            .then((registration) => {
                // ✅ 등록 후 기존에 대기 중인 워커가 있으면 즉시 skipWaiting
                if (registration.waiting) {
                    registration.waiting.postMessage({ type: "SKIP_WAITING" });
                }

                registration.addEventListener("updatefound", () => {
                    const newWorker = registration.installing;
                    if (!newWorker) return;

                    newWorker.addEventListener("statechange", () => {
                        if (
                            newWorker.state === "installed" &&
                            navigator.serviceWorker.controller &&
                            registration.waiting
                        ) {
                            // ✅ 새 워커가 설치되었고 컨트롤러가 존재 → 즉시 activate 요청
                            registration.waiting.postMessage({ type: "SKIP_WAITING" });
                        }
                    });
                });
            })
            .catch((error) => {
                console.error("Service Worker registration failed:", error);
            });

            // ✅ 새 워커가 컨트롤러로 활성화되면 자동 새로고침
            let refreshing = false;
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
        });
    }
}

export function unregister() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
        .then((registration) => {
            registration.unregister();
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
}
