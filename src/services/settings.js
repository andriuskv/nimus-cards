function getDefault() {
    return {
        studyMode: {
            value: "standard"
        },
        randomize: {
            value: true
        },
        cardCount: {
            value: ""
        },
        timeoutDuration: {
            value: ""
        }
    };
}

function getSettings() {
    const defaultSettings = getDefault();
    const storedSettings = JSON.parse(localStorage.getItem("nimus-cards-settings")) || {};

    return Object.assign(defaultSettings, storedSettings);
}

function saveSettings(settings) {
    localStorage.setItem("nimus-cards-settings", JSON.stringify(settings));
}

export {
    getSettings,
    saveSettings
};
