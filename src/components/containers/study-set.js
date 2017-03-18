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
        this.initialCards = [];
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
        this.score = this.initScore(this.mode, this.cards);
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

    updateStandardScore(score, answer) {
        if (!answer) {
            score.incorrectIds.push(this.state.id);
        }
        return score;
    }

    updateLeitnerScore(score, answer) {
        let levelNum = score.currentLevel;

        if (answer) {
            levelNum += 1;
        }
        else {
            if (!levelNum) {
                return score;
            }
            levelNum -= 1;
        }
        const currentLevel = score.levels[score.currentLevel];
        const index = currentLevel.find(id => id === this.state.id);
        const [id] = currentLevel.splice(index, 1);

        if (levelNum < score.levels.length) {
            score.levels[levelNum].push(id);
        }
        return score;
    }

    updateScore(answer, mode, score) {
        if (answer) {
            score.right += 1;
        }
        else {
            score.wrong += 1;
        }
        score.total = score.right + score.wrong;

        if (mode === "standard") {
            return this.updateStandardScore(score, answer);
        }
        return this.updateLeitnerScore(score, answer);
    }

    resetScoreCounter(score) {
        return Object.assign(score, {
            right: 0,
            wrong: 0,
            total: 0
        });
    }

    initStandardScore(score) {
        return this.resetScoreCounter(score || {
            incorrectIds: [],
            currentLevel: 0
        });
    }

    initLeitnerScore(cards) {
        const cardIds = cards.map(card => card.id);

        return this.resetScoreCounter({
            levels: cards && [cardIds, [], [], [], []],
            currentLevel: 0
        });
    }

    initScore(mode, cards) {
        if (mode === "standard") {
            return this.initStandardScore();
        }
        return this.initLeitnerScore(cards);
    }

    getNextCard = answer => {
        const index = this.state.index + 1;

        this.score = this.updateScore(answer, this.mode, this.score);

        if (index === this.cards.length) {
            this.setState(prevState => Object.assign(prevState, { last: true }));
        }
        else {
            this.setState(this.getCard(index));
        }
    }


    initNextStandardRound = () => {
        const cards = this.cards.reduce((cards, card) => {
            if (this.score.incorrectIds.includes(card.id)) {
                cards.push(card);
            }
            return cards;
        }, []);

        this.score.currentLevel += 1;
        this.score = this.initStandardScore(this.score);
        this.cards = this.shuffleArray(cards);
        this.setState(Object.assign({ last: false }, this.getCard()));
    }

    initNextLeitnerLevel = () => {
        let levelNum = this.score.currentLevel;
        let cardIds = [];
        const pastLevels = this.score.levels.slice(0, levelNum + 1);

        this.score = this.resetScoreCounter(this.score);

        for (let i = 0; i < pastLevels.length; i += 1) {
            if (pastLevels[i].length) {
                levelNum = i;
                cardIds = pastLevels[levelNum];
                break;
            }
        }

        if (!cardIds.length) {
            levelNum += 1;
            cardIds = this.score.levels[levelNum];
        }
        this.score.currentLevel = levelNum;
        const cards = this.initialCards.reduce((cards, card) => {
            if (cardIds.includes(card.id)) {
                cards.push(card);
            }
            return cards;
        }, []);

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
                            cardCount={this.initialCards.length}
                            initNextStandardRound={this.initNextStandardRound}
                            initNextLeitnerLevel={this.initNextLeitnerLevel} /> :
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
