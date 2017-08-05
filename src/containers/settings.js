import React from "react";
import { getSettings, saveSettings } from "../services/settings";
import Settings from "../components/settings";

export default class SettingsContainer extends React.Component {
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
        return <Settings settings={this.state} handleChange={this.handleChange} />;
    }
}
