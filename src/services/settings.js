function getDefault() {
    return {
        randomize: {
            value: true
        },
        cardCount: {
            value: ""
        }
    };
}

function getSettings() {
    const defaultSettings = getDefault();
    const storedSettings = JSON.parse(localStorage.getItem("settings")) || {};

    return Object.assign(defaultSettings, storedSettings);
}

function saveSettings(settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
}

export {
    getSettings,
    saveSettings
};
