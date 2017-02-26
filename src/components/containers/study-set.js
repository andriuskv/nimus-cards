import React from "react";
import StudySet from "../views/study-set";

export default class StudySetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setTitle = "";
        this.cards = [];
        this.state = {
            front: "",
            back: ""
        };
        this.sideElement = {};
    }

    componentDidMount() {
        const setId = this.props.routeParams.id;
        const sets = JSON.parse(localStorage.getItem("sets")) || [];
        const set = sets.find(set => set.id === setId);

        if (set) {
            this.setTitle = set.title;
            this.cards = this.shuffleArray(set.cards);
            this.setState(this.getCard());
        }
        else {
            this.props.router.replace("flashcards");
        }
    }

    shuffleArray(array) {
        const arrayCopy = [].concat(array);
        let index = arrayCopy.length;

        while (index) {
            const randomIndex = Math.floor(Math.random() * index);

            index -= 1;
            [arrayCopy[index], arrayCopy[randomIndex]] = [arrayCopy[randomIndex], arrayCopy[index]];
        }
        return arrayCopy;
    }

    revealBack = () => {
        const index = this.state.index;

        this.setState({
            back: this.cards[this.state.index].back,
            revealed: index !== this.cards.length - 1
        });
    }

    getCard(index = 0) {
        return {
            index,
            front: this.cards[index].front,
            back: "",
            revealed: false
        };
    }

    getSideElement = (element, name) => {
        if (!element) {
            return;
        }
        this.sideElement[name] = element;
    }

    componentDidUpdate() {
        Object.keys(this.sideElement).forEach(side => {
            const element = this.sideElement[side];
            const maxHeight = element.clientHeight;
            const height = element.firstElementChild.clientHeight;

            element.style.paddingTop = height < maxHeight ? `${(maxHeight - height) / 2}px` : "8px";
        });

    }

    getNextCard = () => {
        const card = this.getCard(this.state.index + 1);

        this.setState(card);
    }

    render() {
        return <StudySet
            setTitle={this.setTitle}
            card={this.state}
            cardCount={this.cards.length}
            revealBack={this.revealBack}
            getSideElement={this.getSideElement}
            getNextCard={this.getNextCard} />;
    }
}
