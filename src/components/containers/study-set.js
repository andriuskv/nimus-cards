import React from "react";
import { getSettings } from "../../services/settings";
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
        this.score = null;
        this.sideElement = {};
    }

    componentDidMount() {
        const setId = this.props.match.params.id;
        const sets = JSON.parse(localStorage.getItem("sets")) || [];
        const set = sets.find(set => set.id === setId);

        if (set) {
            this.initSet(set);
        }
        else {
            this.props.history.replace("/flashcards");
        }
    }

    componentDidUpdate() {
        Object.keys(this.sideElement).forEach(side => {
            const element = this.sideElement[side];
            const maxHeight = element.clientHeight;
            const height = element.firstElementChild.clientHeight;

            element.style.paddingTop = height < maxHeight ? `${(maxHeight - height) / 2}px` : "8px";
        });
    }

    initSet(set) {
        const settings = getSettings();

        this.mode = settings.studyMode.value;
        this.setTitle = set.title;
        this.cards = this.getCards(set.cards, settings);
        this.score = this.initScore(this.cards);
        this.setState(this.getCard());

        if (this.mode === "leitner") {
            this.initialCards = [].concat(this.cards);
        }
    }

    getCards(setCards, settings) {
        const cardCount = parseInt(settings.cardCount.value, 10);
        let cards = settings.randomize.value ? this.shuffleArray(setCards) : setCards;

        if (cardCount) {
            cards = cards.slice(0, 10);
        }
        return cards;
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
        const { id, front } = this.cards[index];

        return {
            index,
            id,
            front,
            back: ""
        };
    }

    getSideElement = (element, name) => {
        if (!element) {
            return;
        }
        this.sideElement[name] = element;
    }

    updateScore(answer) {
        if (answer) {
            this.score.right += 1;
        }
        else {
            this.score.wrong += 1;
            this.score.incorrectIds.push(this.state.id);
        }
        this.score.total = this.score.right + this.score.wrong;
    }

    resetScore() {
        return Object.assign({}, {
            right: 0,
            wrong: 0,
            total: 0,
            incorrectIds: []
        });
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

    initNextRound = () => {
        const cards = this.cards.reduce((cards, card) => {
            if (this.score.incorrectIds.includes(card.id)) {
                cards.push(card);
            }
            return cards;
        }, []);

        this.score = this.resetScore();
        this.cards = this.shuffleArray(cards);
        this.setState(Object.assign({ last: false }, this.getCard()));
    }

    render() {
        return (
            <Container title={this.setTitle}>
                <div className="container">
                    {this.state.last ?
                        <StudySetScore
                            score={this.score}
                            mode={this.mode}
                            initNextRound={this.initNextRound} /> :
                        <StudySet
                            card={this.state}
                            cardCount={this.cards.length}
                            score={this.score}
                            mode={this.mode}
                            revealBack={this.revealBack}
                            getSideElement={this.getSideElement}
                            getNextCard={this.getNextCard} />
                    }
                </div>
            </Container>
        );
    }
}
