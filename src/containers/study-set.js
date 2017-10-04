import React from "react";
import { getSets } from "../services/db";
import { getSettings } from "../services/settings";
import StudySet from "../components/study-set";
import StudySetScore from "../components/study-set-score";

export default class StudySetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setTitle = "";
        this.cards = [];
        this.initialCards = [];
        this.state = {
            front: null,
            back: null
        };
        this.score = null;
    }

    componentDidMount() {
        getSets().then(sets => {
            const setId = this.props.match.params.id;
            const set = sets.find(set => set.id === setId);

            if (set) {
                this.initSet(set);
            }
            else {
                this.props.history.replace("/flashcards");
            }
        });
    }

    initSet(set) {
        const settings = getSettings();

        this.mode = settings.studyMode.value;
        this.randomizeCards = settings.randomize.value;
        this.timeoutDuration = parseInt(settings.timeoutDuration.value || 0, 10);
        this.setTitle = set.title;
        this.cards = this.getCards(set.cards, settings);
        this.score = this.resetScoreCounter({
            currentLevel: 0,
            session: this.resetScoreCounter()
        });

        if (this.mode === "standard") {
            this.score.incorrectIds = [];
        }
        else {
            const cardIds = this.cards.map(card => card.id);

            this.initialCards = [].concat(this.cards);
            this.score.levels = [cardIds, [], [], [], []];
        }
        this.setState(this.getCard());
    }

    getCards(setCards, settings) {
        const cardCount = parseInt(settings.cardCount.value, 10);
        const cards = settings.randomize.value ? this.shuffleArray(setCards) : setCards;

        if (cardCount) {
            return cards.slice(0, cardCount);
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
            isBackSideRevealed: true,
            visibleSide: "back"
        });
    }

    flipSide = () => {
        this.setState(({ visibleSide }) => ({
            visibleSide: visibleSide === "front" ? "back" : "front"
        }));
    }

    getCard(index = 0) {
        const { id, front, back } = this.cards[index];

        return {
            index,
            id,
            front,
            back,
            isBackSideRevealed: false,
            visibleSide: "front"
        };
    }

    updateStandardScore(score, answer) {
        if (!answer) {
            score.incorrectIds.push(this.state.id);
        }
        score.isLast = score.right === score.total;
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
        const index = currentLevel.findIndex(id => id === this.state.id);
        const [id] = currentLevel.splice(index, 1);

        score.levels[levelNum].push(id);
        score.isLast = score.levels[4].length === this.initialCards.length;
        return score;
    }

    updateScoreCounter(answer, score) {
        if (answer) {
            score.right += 1;
        }
        else {
            score.wrong += 1;
        }
        score.total = score.right + score.wrong;
    }

    updateScore(answer, mode, score) {
        this.updateScoreCounter(answer, score);
        this.updateScoreCounter(answer, score.session);

        if (mode === "standard") {
            return this.updateStandardScore(score, answer);
        }
        return this.updateLeitnerScore(score, answer);
    }

    resetScoreCounter(score = {}) {
        return Object.assign(score, {
            right: 0,
            wrong: 0,
            total: 0
        });
    }

    getNextCard = answer => {
        const index = this.state.index + 1;

        this.score = this.updateScore(answer, this.mode, this.score);
        this.setState(index === this.cards.length ? { last: true } : this.getCard(index));
    }

    getNextLevelCards(cards, cardIds) {
        return cards.filter(card => cardIds.indexOf(card.id) !== -1);
    }

    initNextLevel(score, cards) {
        this.score = this.resetScoreCounter(score);
        this.cards = this.randomizeCards ? this.shuffleArray(cards) : cards;
        this.setState(Object.assign({ last: false }, this.getCard()));
    }

    initNextStandardRound = () => {
        const cards = this.getNextLevelCards(this.cards, this.score.incorrectIds);

        this.score.currentLevel += 1;
        this.score.incorrectIds.length = 0;
        this.initNextLevel(this.score, cards);
    }

    initNextLeitnerLevel = () => {
        const levels = this.score.levels;
        const index = levels.findIndex(level => level.length);
        const cards = this.getNextLevelCards(this.initialCards, levels[index]);

        this.score.currentLevel = index;
        this.initNextLevel(this.score, cards);
    }

    render() {
        if (!this.state.front || !this.state.back) {
            return null;
        }
        return this.state.last ?
            <StudySetScore
                title={this.setTitle}
                score={this.score}
                mode={this.mode}
                initNextStandardRound={this.initNextStandardRound}
                initNextLeitnerLevel={this.initNextLeitnerLevel} /> :
            <StudySet
                title={this.setTitle}
                card={this.state}
                cardCount={this.cards.length}
                score={this.score}
                mode={this.mode}
                timeoutDuration={this.timeoutDuration}
                revealBack={this.revealBack}
                flipSide={this.flipSide}
                getNextCard={this.getNextCard} />;
    }
}
