import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import Icon from "./icon";

export default function ListSets({ sets, editSet, removeSet }) {
    function renderListItem(set, index) {
        return (
            <li className="list-item" key={set.id}>
                <Link to={`/flashcards/set/${set.id}`} className="list-item-title">{set.title}</Link>
                <div className="set-card-count">
                    {set.cards.length} flashcard{set.cards.length > 1 && "s"}
                </div>
                <div className="list-item-btn-container">
                    <button className="btn-icon list-item-btn" title="Edit set"
                        onClick={() => editSet(set)}>
                        <Icon name="edit" />
                        <span>Edit</span>
                    </button>
                    <button className="btn-icon list-item-btn" title="Remove set"
                        onClick={() => removeSet(index)}>
                        <Icon name="remove" />
                        <span>Remove</span>
                    </button>
                </div>
            </li>
        );
    }

    return (
        <Container title="Your Flashcard Sets">
            <div className="container">
                {sets.length ?
                    <ul>{sets.map(renderListItem)}</ul> :
                    <p className="set-list-message">You have no flashcard sets</p>
                }
                <div className="container-footer">
                    <Link to="/flashcards/create" className="btn">Create New Set</Link>
                </div>
            </div>
        </Container>
    );
}
