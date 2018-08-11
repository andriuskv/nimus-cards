import React from "react";
import { Link } from "react-router-dom";
import { getDecks, addDeck, removeDeck } from "../../services/db";
import DeckRemovalDialog from "./deck-removal-dialog";
import Deck from "./deck";

export default class Decks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            decks: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getDecks(this.props.location.state).then(decks => {
            this.setState({
                decks,
                loading: false
            });
        });
    }

    async getDecks(deck) {
        const decks = await getDecks();

        if (deck) {
            const index = this.findDeckIndex(decks, deck.id);

            if (index === -1) {
                decks.push(deck);
            }
            else {
                decks.splice(index, 1, deck);
            }
            addDeck(deck);
        }
        return decks;
    }

    editDeck = deck => {
        this.props.history.push({
            pathname: "/decks/create",
            state: deck
        });
    }

    removeDeck = () => {
        const { decks, deckToRemove } = this.state;
        const index = this.findDeckIndex(decks, deckToRemove.id);

        removeDeck(deckToRemove._id);
        decks.splice(index, 1);
        this.setState({
            decks,
            dialogVisible: false,
            deckToRemove: null
        });
    }

    findDeckIndex(decks, deckId) {
        return decks.findIndex(({ id }) => id === deckId);
    }

    showDialog = deck => {
        this.setState({
            dialogVisible: true,
            deckToRemove: deck
        });
    }

    hideDialog = () => {
        this.setState({
            dialogVisible: false,
            deckToRemove: null
        });
    }

    renderDecks(decks) {
        return decks.map(deck => <Deck key={deck.id} deck={deck}
            showDialog={this.showDialog} editDeck={this.editDeck} />);
    }

    render() {
        const { decks, dialogVisible, loading } = this.state;

        return (
            <React.Fragment>
                <div className="component-header deck-list-header">
                    <h1 className="deck-list-title">Your Decks</h1>
                    <Link to="/decks/create" className="btn deck-list-btn">Create</Link>
                </div>
                {loading ?
                    <img src="./assets/ring-alt.svg" className="deck-loading-indicator" /> :
                    decks.length ?
                        <ul>{this.renderDecks(decks)}</ul> :
                        <h2 className="deck-list-message">You have no decks</h2>
                }
                {dialogVisible && <DeckRemovalDialog
                    deckTitle={this.state.deckToRemove.title}
                    removeDeck={this.removeDeck}
                    cancelRemoval={this.hideDialog} />
                }
            </React.Fragment>
        );
    }
}
