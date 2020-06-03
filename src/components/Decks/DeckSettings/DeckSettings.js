import React, { useState } from "react";
import "./deck-settings.scss";
import cloneDeep from "lodash.clonedeep";
import { getSettings } from "../../../services/settings";
import { saveDeck } from "../../../services/db";
import Modal from "../../Modal";

export default function DeckSettings({ deck, hide }) {
  const initialSettings = deck.settings || {
    ...getSettings(),
    useGlobalSettings: {
      value: true
    }
  };
  const [settings, setState] = useState(cloneDeep(initialSettings));
  const useGlobalSettings = settings.useGlobalSettings.value;

  function hideSettings() {
    const { cardCount, timeoutDuration } = settings;

    if (cardCount.valid) {
      initialSettings.cardCount.value = parseInt(cardCount.value, 10) || 0;
    }

    if (timeoutDuration.valid) {
      initialSettings.timeoutDuration.value = parseInt(timeoutDuration.value, 10) || 0;
    }
    initialSettings.useGlobalSettings = settings.useGlobalSettings;
    initialSettings.randomize = settings.randomize;
    deck.settings = initialSettings;
    saveDeck(deck);
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
            data-name="useGlobalSettings"
            onChange={handleChange}
            defaultChecked={useGlobalSettings}/>
          <div className="checkbox deck-settings-checkbox">
            <div className="checkbox-tick"></div>
          </div>
          <span className="checkbox-label">Use global settings</span>
        </label>
      </div>
      <div className={`deck-settings-item${useGlobalSettings ? " disabled" : ""}`}>
        <label className="checkbox-container">
          <input type="checkbox" className="sr-only checkbox-input"
            data-name="randomize"
            onChange={handleChange}
            defaultChecked={settings.randomize.value}
            disabled={useGlobalSettings}/>
          <div className="checkbox deck-settings-checkbox">
            <div className="checkbox-tick"></div>
          </div>
          <span className="checkbox-label">Randomize cards</span>
        </label>
      </div>
      <div className={`deck-settings-item${useGlobalSettings ? " disabled" : ""}`}>
        <label>
          <span>Use</span>
          <input type="text" className="input deck-settings-input"
            inputMode="numeric"
            data-name="cardCount"
            pattern="[0-9]*$"
            onChange={handleChange}
            defaultValue={settings.cardCount.value}
            disabled={useGlobalSettings}/>
          <span>cards per study session</span>
          <div className="deck-settings-message">Please provide a valid whole number.</div>
        </label>
      </div>
      <div className={`deck-settings-item${useGlobalSettings ? " disabled" : ""}`}>
        <label>
          <span>Reveal answer after</span>
          <input type="text" className="input deck-settings-input"
            inputMode="numeric"
            data-name="timeoutDuration"
            pattern="^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$"
            onChange={handleChange}
            defaultValue={settings.timeoutDuration.value}
            disabled={useGlobalSettings}/>
          <span>seconds</span>
          <div className="deck-settings-message">Please provide a valid whole number.<br/> Minimal accepted value is 5 seconds.</div>
        </label>
      </div>
    </Modal>
  );
}
