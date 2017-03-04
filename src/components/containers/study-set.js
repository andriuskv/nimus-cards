import React from "react";
import Container from "../views/container";
import StudySet from "../views/study-set";
import StudySetScore from "../views/study-set-score";

export default class StudySetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setTitle = "";
        this.cards = [];
        this.state = {
            front: "",
            back: ""
        };
        this.score = {
            right: 0,
            wrong: 0,
            total: 0
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
        this.setState({
            back: this.cards[this.state.index].back
        });
    }

    getCard(index = 0) {
        return {
            index,
            front: this.cards[index].front,
            back: ""
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

    updateScore(answer) {
        if (answer) {
            this.score.right += 1;
        }
        else {
            this.score.wrong += 1;
        }
        this.score.total = this.score.right + this.score.wrong;
    }

    getNextCard = answer => {
        const index = this.state.index + 1;

        this.updateScore(answer);

        if (index === this.cards.length) {
            this.setState(prevState => Object.assign(prevState, { last: true }));
        }
        else {
            const card = this.getCard(index);

            this.setState(card);
        }
    }

    closeScoreboard = () => {
        this.props.router.push("flashcards");
    }

    render() {
        return (
            <Container title={this.setTitle}>
                <div className="container">
                    {this.state.last ?
                        <StudySetScore
                            score={this.score}
                            closeScoreboard={this.closeScoreboard} /> :
                        <StudySet
                            card={this.state}
                            cardCount={this.cards.length}
                            revealBack={this.revealBack}
                            getSideElement={this.getSideElement}
                            getNextCard={this.getNextCard} />
                    }
                </div>
            </Container>
        );
    }
}
