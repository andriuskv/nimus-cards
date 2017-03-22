function getDefault() {
    return {
        randomize: {
            value: true
        },
        cardCount: {
            value: ""
        },
        studyMode: {
            value: "standard"
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
