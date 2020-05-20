import React, { useState, useEffect } from "react";
import "./settings.scss";
import { getSettings, saveSettings } from "../../../services/settings";

export default function Settings({ hide }) {
    const [settings, setState] = useState(getSettings());

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, []);

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    function handleClick({ target, currentTarget }) {
        if (target === currentTarget) {
            hide();
        }
    }

    function handleKeydown({ key }) {
        if (key === "Escape") {
            hide();
        }
    }

    function handleChange({ target }) {
        const settingName = target.getAttribute("data-name");
        const setting = settings[settingName];

        switch (target.type) {
            case "checkbox":
                setting.value = target.checked;
                break;
            case "text":
                setting.value = target.validity.valid ? parseInt(target.value, 10) || 0 : 0;
                break;
        }
        setState({ ...settings, [settingName]: setting });
    }

    return (
        <div className="mask" onClick={handleClick}>
            <div className="modal" onChange={handleChange}>
                <h3 className="deck-settings-modal-title">Settings</h3>
                <div className="deck-settings-item">
                    <label className="checkbox-container">
                        <input type="checkbox" className="sr-only checkbox-input"
                            data-name="randomize"
                            defaultChecked={settings.randomize.value}/>
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
                            data-name="cardCount"
                            pattern="^[0-9]+$"
                            defaultValue={settings.cardCount.value} />
                        <span>cards per study session</span>
                        <div className="deck-settings-message">Please provide a valid whole number.</div>
                    </label>
                </div>
                <div className="deck-settings-item">
                    <label>
                        <span>Reveal answer after</span>
                        <input type="text" className="input deck-settings-input"
                            data-name="timeoutDuration"
                            pattern="^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$"
                            defaultValue={settings.timeoutDuration.value} />
                        <span>seconds</span>
                        <div className="deck-settings-message">Please provide a valid whole number.<br /> Minimal accepted value is 5 seconds.</div>
                    </label>
                </div>
            </div>
        </div>
    );
}
