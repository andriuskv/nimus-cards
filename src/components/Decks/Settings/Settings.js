import React, { useState } from "react";
import "./settings.scss";
import { getSettings, saveSettings } from "../../../services/settings";
import Modal from "../../Modal";

export default function Settings({ hide }) {
  const [settings, setState] = useState(getSettings());

  function hideSettings() {
    const initialSettings = getSettings();
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
    <Modal hide={hideSettings}>
      <h3 className="modal-title">Settings</h3>
      <div className="deck-settings-item">
        <label className="checkbox-container">
          <input type="checkbox" className="sr-only checkbox-input"
            data-name="randomize"
            onChange={handleChange}
            checked={settings.randomize.value}/>
          <div className="checkbox deck-settings-checkbox">
            <div className="checkbox-tick"></div>
          </div>
          <span className="checkbox-label">Randomize cards</span>
        </label>
      </div>
      <div className="deck-settings-item">
        <label>
          <span>Use</span>
          <input type="text" className="input deck-settings-input"
            inputMode="numeric"
            data-name="cardCount"
            onChange={handleChange}
            pattern="[0-9]*$"
            value={settings.cardCount.value}/>
          <span>cards per study session</span>
          <div className="deck-settings-message">Please provide a valid whole number.</div>
        </label>
      </div>
      <div className="deck-settings-item">
        <label>
          <span>Reveal answer after</span>
          <input type="text" className="input deck-settings-input"
            inputMode="numeric"
            data-name="timeoutDuration"
            onChange={handleChange}
            pattern="^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$"
            value={settings.timeoutDuration.value}/>
          <span>seconds</span>
          <div className="deck-settings-message">Please provide a valid whole number.<br/> Minimal accepted value is 5 seconds.</div>
        </label>
      </div>
    </Modal>
  );
}
