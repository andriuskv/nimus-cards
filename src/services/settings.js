let settings = {
  ...getDefault(),
  ...JSON.parse(localStorage.getItem("nimus-cards-settings"))
};

function getDefault() {
  return {
    textSize: {
      value: 1
    },
    randomize: {
      value: true
    },
    cardCount: {
      value: 10
    },
    timeoutDuration: {
      value: ""
    }
  };
}

function getGlobalSettings() {
  return structuredClone(settings);
}

function saveSettings(newSettings) {
  settings = { ...settings, ...newSettings };
  localStorage.setItem("nimus-cards-settings", JSON.stringify(settings));
}

export {
  getGlobalSettings,
  saveSettings
};
