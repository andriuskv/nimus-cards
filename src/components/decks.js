import React from "react";
import { Link } from "react-router-dom";
import Icon from "./icon";

export default class DecksContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogBoxVisible: false,
            deck: null
        };
    }

    showDialogBox = deck => {
        this.setState({
            dialogBoxVisible: true,
            deck
        });
    }

    removeDeck = index => {
        this.props.removeDeck(index);
        this.hideDialogBox();
    }

    hideDialogBox = () => {
        this.setState({
            dialogBoxVisible: false,
            deck: null
        });
    }

    renderDeck = (deck, index) => {
        return (
            <li className="deck" key={deck.id}>
                <Link to={`/decks/${deck.id}`} className="deck-title">{deck.title}</Link>
                {deck.description && <p className="deck-description">{deck.description}</p>}
                <div className="deck-card-count">
                    {deck.cards.length} card{deck.cards.length > 1 && "s"}
                </div>
                <div className="deck-btn-container">
                    <button className="btn-icon deck-btn" title="Edit"
                        onClick={() => this.props.editDeck(deck)}>
                        <Icon name="edit" />
                        <span>Edit</span>
                    </button>
                    <button className="btn-icon deck-btn" title="Remove"
                        onClick={() => this.showDialogBox({ index, title: deck.title })}>
                        <Icon name="remove" />
                        <span>Remove</span>
                    </button>
                </div>
            </li>
        );
    }

    renderDialogBox = ({ index, title }) => {
        return (
            <div className="deck-dialog-box-container">
                <div className="deck-dialog-box">
                    <h3 className="deck-dialog-box-title">Are you sure you want to remove <b>{title}</b> deck?</h3>
                    <div className="deck-dialog-box-btns">
                        <button className="btn-danger" onClick={() => this.removeDeck(index)}>Remove</button>
                        <button onClick={this.hideDialogBox} className="btn-icon">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { loading, decks } = this.props;
        const { deck, dialogBoxVisible } = this.state;

        return (
            <React.Fragment>
                <div className="component-header deck-list-header">
                    <h1 className="deck-list-title">Your Decks</h1>
                    <Link to="/decks/create" className="btn deck-list-btn">Create</Link>
                </div>
                {loading && <img src="./assets/ring-alt.svg" className="deck-loading-indicator" />}
                {!loading && (decks.length ?
                    <ul>{decks.map(this.renderDeck)}</ul> :
                    <h2 className="deck-list-message">You have no decks</h2>
                )}
                {dialogBoxVisible && this.renderDialogBox(deck)}
            </React.Fragment>
        );
    }
}
