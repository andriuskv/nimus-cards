let settings = JSON.parse(localStorage.getItem("nimus-cards-settings")) || getDefault();

function getDefault() {
  return {
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

function getSettings() {
  return settings;
}

function saveSettings(newSettings) {
  settings = { ...settings, ...newSettings };
  localStorage.setItem("nimus-cards-settings", JSON.stringify(settings));
}

export {
  getSettings,
  saveSettings
};
