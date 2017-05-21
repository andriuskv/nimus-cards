import React from "react";

export default function CardSide({ index, side, oppositeSide, card }) {
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

    function setSideValue(element) {
        if (element) {
            element.textContent = card[side];
        }
    }

    return (
        <div className={`create-side${card.visibleSide === side ? " visible": ""}`}>
            <span className="side-name">{side}</span>
            <div id={`${side}-${index}`} className="input create-side-input" ref={setSideValue}
                contentEditable></div>
            {renderMessage()}
        </div>
    );
}
