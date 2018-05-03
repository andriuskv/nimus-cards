import React, { Component } from "react";
import { getSettings, saveSettings } from "../services/settings";

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = getSettings();
    }

    updateSetting(name, setting) {
        this.setState({
            [name]: setting
        }, () => {
            saveSettings(this.state);
        });
    }

    handleChange = ({ target }) => {
        const settingName = target.getAttribute("data-name");
        const setting = this.state[settingName];

        switch (target.type) {
            case "checkbox":
                setting.value = target.checked;
                break;
            case "text":
                setting.value = target.validity.valid ? target.value : "";
                break;
            case "radio":
                setting.value = target.getAttribute("data-study-mode");
                break;
        }
        this.updateSetting(settingName, setting);
    }

    render() {
        return (
            <div onChange={this.handleChange}>
                <div className="settings-item">
                    <div className="settings-item-title">Study mode</div>
                    <label className="settings-label settings-radio-label">
                        <input type="radio" name="study-mode"
                            className="radio-input"
                            data-name="studyMode"
                            data-study-mode="standard"
                            defaultChecked={this.state.studyMode.value === "standard"} />
                        <div className="radio settings-radio"></div>
                        <span>Standard</span>
                    </label>
                    <label className="settings-label settings-radio-label">
                        <input type="radio" name="study-mode"
                            className="radio-input"
                            data-name="studyMode"
                            data-study-mode="leitner"
                            defaultChecked={this.state.studyMode.value === "leitner"} />
                        <div className="radio settings-radio"></div>
                        <span>Leitner system</span>
                    </label>
                </div>
                <label className="settings-item settings-label">
                    <input type="checkbox" className="checkbox-input"
                        data-name="randomize"
                        defaultChecked={this.state.randomize.value} />
                    <div className="checkbox settings-checkbox"></div>
                    <span>Randomize cards</span>
                </label>
                <label className="settings-item">
                    <span>Use</span>
                    <input type="text" className="input settings-input"
                        data-name="cardCount"
                        pattern="^[0-9]+$"
                        defaultValue={this.state.cardCount.value} />
                    <span>cards per study session</span>
                    <div className="settings-message">Please provide a valid whole number.</div>
                </label>
                <label className="settings-item">
                    <span>Reveal answer after</span>
                    <input type="text" className="input settings-input"
                        data-name="timeoutDuration"
                        pattern="^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$"
                        defaultValue={this.state.timeoutDuration.value} />
                    <span>seconds</span>
                    <div className="settings-message">Please provide a valid whole number.<br /> Minimal accepted value is 5 seconds.</div>
                </label>
            </div>
        );
    }
}
