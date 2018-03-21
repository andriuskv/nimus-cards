function dispatchCustomEvent(eventName, data = null) {
    const event = new CustomEvent(eventName, { detail: data });

    window.dispatchEvent(event);
}

function initServiceWorker() {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").then(reg => {
            reg.onupdatefound = () => {
                const worker = reg.installing;

                worker.onstatechange = () => {
                    if (worker.state === "installed") {
                        dispatchCustomEvent("sw-state-change", navigator.serviceWorker.controller ? "update" : "init");
                    }
                };
            };
        }).catch(console.log);
    });
}

export {
    initServiceWorker
};
