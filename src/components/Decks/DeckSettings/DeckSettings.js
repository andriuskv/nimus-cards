import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { getGlobalSettings } from "../../../services/settings";
import { saveDeck } from "../../../services/db";
import Settings from "../Settings";

export default function DeckSettings({ deck, hide }) {
  const initialSettings = deck.settings || {
    ...getGlobalSettings(),
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
    <Settings hide={hideSettings}>
      <h3 className="modal-title">Deck Settings</h3>
      <label className="decks-settings-item decks-settings-item-spaced checkbox-container">
        <span>Use global settings</span>
        <input type="checkbox" className="sr-only checkbox-input"
          data-name="useGlobalSettings"
          onChange={handleChange}
          defaultChecked={useGlobalSettings}/>
        <div className="checkbox decks-settings-checkbox">
          <div className="checkbox-tick"></div>
        </div>
      </label>
      <label className={`decks-settings-item decks-settings-item-spaced${useGlobalSettings ? " disabled" : ""}`}>
        <span>Randomize cards</span>
        <input type="checkbox" className="sr-only checkbox-input"
          data-name="randomize"
          onChange={handleChange}
          checked={settings.randomize.value}
          disabled={useGlobalSettings}/>
        <div className="checkbox decks-settings-checkbox">
          <div className="checkbox-tick"></div>
        </div>
      </label>
      <label className={`decks-settings-item${useGlobalSettings ? " disabled" : ""}`}>
        <span>Use</span>
        <input type="text" className="input decks-settings-input"
          inputMode="numeric"
          data-name="cardCount"
          onChange={handleChange}
          pattern="[0-9]*$"
          value={settings.cardCount.value}
          disabled={useGlobalSettings}/>
        <span>cards per study session</span>
        <div className="decks-settings-message">Please provide a valid whole number.</div>
      </label>
      <label className={`decks-settings-item${useGlobalSettings ? " disabled" : ""}`}>
        <span>Reveal answer after</span>
        <input type="text" className="input decks-settings-input"
          inputMode="numeric"
          data-name="timeoutDuration"
          onChange={handleChange}
          pattern="^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$"
          value={settings.timeoutDuration.value}
          disabled={useGlobalSettings}/>
        <span>seconds</span>
        <div className="decks-settings-message">Please provide a valid whole number.<br/> Minimal accepted value is 5 seconds.</div>
      </label>
    </Settings>
  );
}
