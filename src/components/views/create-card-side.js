import React from "react";
import Icon from "./icon";

export default function CardSide({ index, side, oppositeSide, card, switchSide }) {
    const visibleSide = card.visibleSide || "front";

    function renderSwitchSideButton() {
        return visibleSide === side && (
            <button type="button" className="btn-icon switch-side-btn"
                title={`Switch to ${oppositeSide} side`}
                onClick={() => switchSide(index, side)}>
                <Icon name="switch" />
            </button>
        );
    }

    function renderMessage() {
        const isCurrentSideEmpty = !card[side] && card[oppositeSide];
        const isOppositeSideEmpty = !card[oppositeSide] && card[side];
        let message = "";

        if (isCurrentSideEmpty) {
            message = `Please fill in card ${side}`;
        }
        else if (isOppositeSideEmpty && window.innerWidth <= 600) {
            const capitalizedName = oppositeSide.charAt(0).toUpperCase() + oppositeSide.slice(1);
            message = `${capitalizedName} side is empty`;
        }
        else {
            return null;
        }
        return <div className="create-side-message">{message}</div>;
    }

    return (
        <label className={`create-side${visibleSide === side ? " visible": ""}`}>
            <div className="create-side-header">
                {renderSwitchSideButton()}
                <span className="side-name">{side}</span>
            </div>
            <textarea id={`${side}-${index}`} className="input create-side-input" name={side}
                defaultValue={card[side]}></textarea>
            {renderMessage()}
        </label>
    );
}
