import React from "react";

export default function DeckRemovalDialog({ deckTitle, removeDeck, cancelRemoval }) {
    return (
        <div className="deck-dialog-box-container">
            <div className="deck-dialog-box">
                <h3 className="deck-dialog-box-title">Are you sure you want to remove <b>{deckTitle}</b> deck?</h3>
                <div className="deck-dialog-box-btns">
                    <button className="btn-danger" onClick={removeDeck}>Remove</button>
                    <button className="btn-icon" onClick={cancelRemoval}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
