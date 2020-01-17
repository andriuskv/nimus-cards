import React, { useState, useEffect } from "react";
import { getSettings, saveSettings } from "../services/settings";

export default function Settings() {
    const [settings, setState] = useState(getSettings());

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

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
            case "radio":
                setting.value = target.getAttribute("data-study-mode");
                break;
        }
        setState({ ...settings, [settingName]: setting });
    }

    return (
        <div onChange={handleChange}>
            <div className="settings-item">
                <div className="settings-item-title">Study mode</div>
                <label className="radio-container settings-radio-container">
                    <input type="radio" name="study-mode"
                        className="sr-only radio-input"
                        data-name="studyMode"
                        data-study-mode="standard"
                        defaultChecked={settings.studyMode.value === "standard"}/>
                    <div className="radio"></div>
                    <span className="radio-label">Standard</span>
                </label>
                <label className="radio-container settings-radio-container">
                    <input type="radio" name="study-mode"
                        className="sr-only radio-input"
                        data-name="studyMode"
                        data-study-mode="leitner"
                        defaultChecked={settings.studyMode.value === "leitner"}/>
                    <div className="radio"></div>
                    <span className="radio-label">Leitner system</span>
                </label>
            </div>
            <div className="settings-item">
                <label className="checkbox-container">
                    <input type="checkbox" className="sr-only checkbox-input"
                        data-name="randomize"
                        defaultChecked={settings.randomize.value}/>
                    <div className="checkbox">
                        <div className="checkbox-tick"></div>
                    </div>
                    <span className="checkbox-label">Randomize cards</span>
                </label>
            </div>
            <label className="settings-item">
                <span>Use</span>
                <input type="text" className="input settings-input"
                    data-name="cardCount"
                    pattern="^[0-9]+$"
                    defaultValue={settings.cardCount.value} />
                <span>cards per study session</span>
                <div className="settings-message">Please provide a valid whole number.</div>
            </label>
            <label className="settings-item">
                <span>Reveal answer after</span>
                <input type="text" className="input settings-input"
                    data-name="timeoutDuration"
                    pattern="^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$"
                    defaultValue={settings.timeoutDuration.value} />
                <span>seconds</span>
                <div className="settings-message">Please provide a valid whole number.<br /> Minimal accepted value is 5 seconds.</div>
            </label>
        </div>
    );
}
