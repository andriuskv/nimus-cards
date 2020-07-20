import React, { useState } from "react";
import { getGlobalSettings, saveSettings } from "../../../services/settings";
import Settings from "../Settings";

export default function GlobalSettings({ hide }) {
  const [settings, setState] = useState(getGlobalSettings());

  function hideSettings() {
    const initialSettings = getGlobalSettings();
    const { cardCount, timeoutDuration } = settings;

    if (cardCount.valid) {
      initialSettings.cardCount.value = parseInt(cardCount.value, 10) || 0;
    }

    if (timeoutDuration.valid) {
      initialSettings.timeoutDuration.value = parseInt(timeoutDuration.value, 10) || 0;
    }
    initialSettings.randomize = settings.randomize;

    saveSettings(initialSettings);
    hide();
  }

  function handleChange({ target }) {
    const settingName = target.getAttribute("data-name");
    const setting = { ...settings[settingName] };

    switch (target.type) {
      case "checkbox":
        setting.value = target.checked;
        break;
      case "text":
        setting.valid = target.validity.valid;
        setting.value = target.value;
        break;
    }
    setState({ ...settings, [settingName]: setting });
  }

  return (
    <Settings hide={hideSettings}>
      <h3 className="modal-title">Global Deck Settings</h3>
      <div className="decks-settings-item">
        <label className="checkbox-container">
          <input type="checkbox" className="sr-only checkbox-input"
            data-name="randomize"
            onChange={handleChange}
            checked={settings.randomize.value}/>
          <div className="checkbox decks-settings-checkbox">
            <div className="checkbox-tick"></div>
          </div>
          <span className="checkbox-label">Randomize cards</span>
        </label>
      </div>
      <div className="decks-settings-item">
        <label>
          <span>Use</span>
          <input type="text" className="input decks-settings-input"
            inputMode="numeric"
            data-name="cardCount"
            onChange={handleChange}
            pattern="[0-9]*$"
            value={settings.cardCount.value}/>
          <span>cards per study session</span>
          <div className="decks-settings-message">Please provide a valid whole number.</div>
        </label>
      </div>
      <div className="decks-settings-item">
        <label>
          <span>Reveal answer after</span>
          <input type="text" className="input decks-settings-input"
            inputMode="numeric"
            data-name="timeoutDuration"
            onChange={handleChange}
            pattern="^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$"
            value={settings.timeoutDuration.value}/>
          <span>seconds</span>
          <div className="decks-settings-message">Please provide a valid whole number.<br/> Minimal accepted value is 5 seconds.</div>
        </label>
      </div>
    </Settings>
  );
}
