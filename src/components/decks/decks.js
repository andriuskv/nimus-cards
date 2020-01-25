import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchDecks, deleteDeck } from "../../services/db";
import DeckRemovalDialog from "./deck-removal-dialog";
import Deck from "./deck";

export default function Decks(props) {
    const [decks, updateDecks] = useState([]);
    const [dialog, toggleDialog] = useState({ visible: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDecks().then(decks => {
            updateDecks(decks);
            setLoading(false);
        });
    }, []);

    function findDeckIndex(decks, deckId) {
        return decks.findIndex(({ id }) => id === deckId);
    }

    function editDeck(deck) {
        props.history.push(`/decks/${deck.id}/edit`);
    }

    function removeDeck() {
        const index = findDeckIndex(decks, dialog.deck.id);

        decks.splice(index, 1);
        updateDecks([...decks]);
        deleteDeck(dialog.deck.id);
        hideDialog();
    }

    function showDialog(deck) {
        toggleDialog({ visible: true, deck });
    }

    function hideDialog() {
        toggleDialog({ visible: false, deck: null });
    }

    function renderDecks(decks) {
        return decks.map(deck => (
            <Deck key={deck.id} deck={deck}
                showDialog={showDialog}
                editDeck={editDeck} />
        ));
    }

    return (
        <Fragment>
            <div className="deck-list-header">
                <h1 className="deck-list-title">Your Decks</h1>
                <Link to="/decks/create" className="btn deck-list-btn">Create</Link>
            </div>
            {loading ? "" : decks.length ?
                <ul>{renderDecks(decks)}</ul> :
                <h2 className="deck-list-message">You have no decks</h2>
            }
            {dialog.visible && <DeckRemovalDialog
                deckTitle={dialog.deck.title}
                removeDeck={removeDeck}
                cancelRemoval={hideDialog} />
            }
        </Fragment>
    );
}
