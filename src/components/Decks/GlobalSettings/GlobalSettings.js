import { useState } from "react";
import { getGlobalSettings, saveSettings } from "../../../services/settings";
import Settings from "../Settings";

export default function GlobalSettings({ hide }) {
  const [settings, setState] = useState(getGlobalSettings());

  function hideSettings() {
    const initialSettings = getGlobalSettings();
    const { cardCount, timeoutDuration, textSize } = settings;

    if (cardCount.valid) {
      initialSettings.cardCount.value = parseInt(cardCount.value, 10) || 0;
    }

    if (timeoutDuration.valid) {
      initialSettings.timeoutDuration.value = parseInt(timeoutDuration.value, 10) || 0;
    }
    initialSettings.textSize.value = parseFloat(textSize.value);
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

  function handleTextSizeChange({ target }) {
    setState({ ...settings, textSize: {
      value: target.value
    }});
  }

  return (
    <Settings hide={hideSettings}>
      <h3 className="modal-title">Global Deck Settings</h3>
      <label className="decks-settings-item decks-settings-item-spaced">
        <span>Text size</span>
        <select className="input decks-settings-select"
          value={settings.textSize.value}
          onChange={handleTextSizeChange}>
          <option value="0.875">Small</option>
          <option value="1">Medium</option>
          <option value="1.125">Big</option>
          <option value="1.25">Huge</option>
        </select>
      </label>
      <label className="checkbox-container decks-settings-item decks-settings-item-spaced">
        <span>Randomize cards</span>
        <input type="checkbox" className="sr-only checkbox-input"
          data-name="randomize"
          onChange={handleChange}
          checked={settings.randomize.value}/>
        <div className="checkbox decks-settings-checkbox">
          <div className="checkbox-tick"></div>
        </div>
      </label>
      <label className="decks-settings-item">
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
      <label className="decks-settings-item">
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
    </Settings>
  );
}
