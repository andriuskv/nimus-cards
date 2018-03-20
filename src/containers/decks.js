import React from "react";
import { getDecks, addDeck, removeDeck } from "../services/db";
import Decks from "../components/decks";

export default class DecksContainer extends React.Component {
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
            const index = decks.findIndex(({ id }) => id === deck.id);

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

    removeDeck = index => {
        const decks = [...this.state.decks];
        const { _id } = decks[index];

        removeDeck(_id);
        decks.splice(index, 1);
        this.setState({ decks });
    }

    render() {
        return <Decks
            decks={this.state.decks}
            loading={this.state.loading}
            editDeck={this.editDeck}
            removeDeck={this.removeDeck} />;
    }
}
