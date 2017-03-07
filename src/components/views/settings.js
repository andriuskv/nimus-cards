import React from "react";
import Container from "../views/container";

export default function Settings({ settings, handleChange }) {
    return (
        <Container title="Settings">
            <div className="container" onChange={handleChange}>
                <div className="settings-item">
                    <label htmlFor="setting-checkbox-1" className="settings-label">
                        <input type="checkbox" id="setting-checkbox-1" className="checkbox-input"
                            data-name="randomize"
                            defaultChecked={settings.randomize.value} />
                        <div className="checkbox settings-checkbox"></div>
                        <span>Randomize cards</span>
                    </label>
                </div>
                <div className="settings-item">
                    <span>Use</span>
                    <input type="text" className="input settings-input"
                        data-name="cardCount"
                        defaultValue={settings.cardCount.value} />
                    <span>cards per study session</span>
                    {settings.cardCount.invalid &&
                        <div className="settings-message">Please provide a whole number</div>
                    }
                </div>
            </div>
        </Container>
    );
}
