import React from "react";
import CreateSet from "../views/create-set";

function getRandomString() {
    return Math.random().toString(32).slice(2, 10);
}

export default class CreateSetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            set: this.getSet(props.location.state)
        };
        this.messageTimeout = 0;
    }

    componentDidMount() {
        if (this.props.location.key) {
            this.props.router.replace(this.props.location.pathname);
        }
    }

    getSet(state = {}) {
        const card = {
            front: "",
            back: ""
        };
        const set = Object.assign({
            id: getRandomString(),
            title: "",
            cards: []
        }, state);

        if (!set.cards.length) {
            set.cards.push(card);
        }
        return set;
    }

    handleSubmit = event => {
        const set = Object.assign({}, this.state.set);
        const containsEmptySide = set.cards.some(({ front, back }) => !front && back || !back && front);

        event.preventDefault();

        if (!containsEmptySide) {
            set.cards = set.cards.filter(card => card.front || card.back);

            if (!set.cards.length) {
                this.setState({ message: "Please fill in at least one card" });

                clearTimeout(this.messageTimeout);
                this.messageTimeout = setTimeout(() => {
                    this.setState({ message: "" });
                }, 3200);
                return;
            }
            this.props.router.push({
                pathname: "/flashcards",
                state: set
            });
        }
    }

    getNewCard = ({ target }) => {
        const set = Object.assign({}, this.state.set);

        set.cards.push({
            front: "",
            back: ""
        });

        this.setState({ set }, () => {
            target.scrollIntoView();
        });
    }

    handleChange = ({ target: { value, id } }) => {
        const set = Object.assign({}, this.state.set);

        if (id === "title") {
            set.title = value;
        }
        else {
            const [name, index] = id.split("-");

            set.cards[index][name] = value;
        }
        this.setState({ set });
    }

    render() {
        return <CreateSet
            set={this.state.set}
            message={this.state.message}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            getNewCard={this.getNewCard} />;
    }
}
