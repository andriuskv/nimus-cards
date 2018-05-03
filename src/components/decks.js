import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDecks, addDeck, removeDeck } from "../services/db";
import Icon from "./icon";

export default class Decks extends Component {
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
            dialogBoxVisible: false,
            deckToRemove: null
        });
    }

    findDeckIndex(decks, deckId) {
        return decks.findIndex(({ id }) => id === deckId);
    }

    showDialogBox = deck => {
        this.setState({
            dialogBoxVisible: true,
            deckToRemove: deck
        });
    }

    hideDialogBox = () => {
        this.setState({
            dialogBoxVisible: false,
            deckToRemove: null
        });
    }

    renderDeck = deck => {
        return (
            <li className="deck" key={deck.id}>
                <Link to={`/decks/${deck.id}`} className="deck-title">{deck.title}</Link>
                {deck.description && <p className="deck-description">{deck.description}</p>}
                <div className="deck-card-count">
                    {deck.cards.length} card{deck.cards.length > 1 && "s"}
                </div>
                <div className="deck-btn-container">
                    <button className="btn-icon deck-btn" title="Edit"
                        onClick={() => this.editDeck(deck)}>
                        <Icon name="edit" />
                        <span>Edit</span>
                    </button>
                    <button className="btn-icon deck-btn" title="Remove"
                        onClick={() => this.showDialogBox(deck)}>
                        <Icon name="remove" />
                        <span>Remove</span>
                    </button>
                </div>
            </li>
        );
    }

    render() {
        const { decks, dialogBoxVisible, loading } = this.state;

        return (
            <React.Fragment>
                <div className="component-header deck-list-header">
                    <h1 className="deck-list-title">Your Decks</h1>
                    <Link to="/decks/create" className="btn deck-list-btn">Create</Link>
                </div>
                {loading ?
                    <img src="./assets/ring-alt.svg" className="deck-loading-indicator" /> :
                    decks.length ?
                        <ul>{decks.map(this.renderDeck)}</ul> :
                        <h2 className="deck-list-message">You have no decks</h2>
                }
                {dialogBoxVisible && (
                    <div className="deck-dialog-box-container">
                        <div className="deck-dialog-box">
                            <h3 className="deck-dialog-box-title">Are you sure you want to remove <b>{this.state.deckToRemove.title}</b> deck?</h3>
                            <div className="deck-dialog-box-btns">
                                <button className="btn-danger" onClick={() => this.removeDeck()}>Remove</button>
                                <button onClick={this.hideDialogBox} className="btn-icon">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
