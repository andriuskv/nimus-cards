import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchDeck } from "../../services/db";
import NoMatch from "../NoMatch";
import "./deck-status.scss";

export default function DeckStatus() {
  const location = useLocation();
  const params = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    fetchDeck(params.id).then(deck => {
      if (deck) {
        const learnedCards = deck.cards.filter(card => card.level > 1);
        deck.learnedCardCount = learnedCards.length;
        deck.memorizedCardCount = learnedCards.filter(card => card.level === 8).length;
        setState(deck);
      }
      else {
        setState({ error: true });
      }
    });
  }, [location.pathname]);

  function getBackSideValue(side) {
    if (side.type === "text" || side.type === "exact") {
      return side.typeOptions.value;
    }
    else if (side.type === "multi") {
      return side.typeOptions.options.find(({ id }) => side.typeOptions.correctId === id).value;
    }
  }

  function getCardStatus(card) {
    if (card.level) {
      const diff = card.nextReview - Date.now();

      if (diff < 0) {
        return "Ready to review";
      }
      const minutes = Math.ceil(diff / 1000 / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days) {
        return `Review in ${days} day${days > 1 ? "s" : ""}`;
      }
      else if (hours) {
        return `Review in ${hours} hour${hours > 1 ? "s" : ""}`;
      }
      return `Review in ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    return "Ready to learn";
  }

  if (!state) {
    return null;
  }
  else if (state.error) {
    return <NoMatch/>;
  }
  return (
    <div className="container max-width-limit deck-status">
      <div className="deck-status-header">
        <h2 className="deck-status-title">{state.title}</h2>
        <div className="deck-status-progress">Learned {state.learnedCardCount} out of {state.cards.length} cards, {state.memorizedCardCount} memorized</div>
        <div className="deck-status-progress-bar-container">
          <div className="deck-status-progress-bar"
            style={{ "--width": `${state.learnedCardCount / state.cards.length * 100}%` }}></div>
          <div className="deck-status-progress-half-bar"
            style={{ "--width": `${state.memorizedCardCount / state.cards.length * 100}%` }}></div>
        </div>
      </div>
      <ul className="deck-status-items">
        <li className="deck-status-item">
          <div className="deck-status-item-column deck-status-items-header-item deck-status-item-column-1">Front</div>
          <div className="deck-status-item-column deck-status-items-header-item deck-status-item-column-2">Back</div>
          <div className="deck-status-item-column deck-status-items-header-item deck-status-item-column-3">Status</div>
        </li>
        {state.cards.map((card, index) => (
          <li className="deck-status-item" key={index}>
            <div className="deck-status-item-column deck-status-item-column-1">{card.front.attachment?.description || card.front.text}</div>
            <div className="deck-status-item-column deck-status-item-column-2">{getBackSideValue(card.back)}</div>
            <div className="deck-status-item-column deck-status-item-column-3">{getCardStatus(card)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
