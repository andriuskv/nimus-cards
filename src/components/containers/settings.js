import React from "react";
import { getSettings, saveSettings } from "../../services/settings";
import Settings from "../views/settings";

export default class SettingsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = getSettings();
    }

    updateSetting(name, setting) {
        this.setState({
            [name]: setting
        }, () => {
            if (!setting.invalid) {
                saveSettings(this.state);
            }
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
                setting.value = target.value.trim();
                setting.invalid = setting.value && !/^[0-9]+$/g.test(setting.value);
                break;
        }

        this.updateSetting(settingName, setting);
    }

    render() {
        return <Settings settings={this.state} handleChange={this.handleChange} />;
    }
}
