import React from "react";
import { Link } from "react-router";
import Container from "./container";

export default function ListSets({ sets, editSet, removeSet }) {
    function getList() {
        return (
            <ul className="set-list">
                {sets.map((set, index) => (
                    <li className="list-item" key={set.id}>
                        <Link to={`/flashcards/set/${set.id}`} className="list-item-title">{set.title}</Link>
                        <div className="set-card-count">
                            {set.cards.length} flashcard{set.cards.length > 1 && "s"}
                        </div>
                        <div className="list-item-btn-container">
                            <button className="btn-icon list-item-btn" title="Edit set"
                                onClick={() => editSet(set)}>
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,
                                        2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,
                                        17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                </svg>
                                <span>Edit</span>
                            </button>
                            <button className="btn-icon list-item-btn" title="Remove set"
                                onClick={() => removeSet(index)}>
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,
                                        21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                                <span>Remove</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <Container title="Your Flashcard Sets">
            <div className="container">
                {sets.length ? getList() : <p className="set-list-message">You have no flashcard sets</p>}
                <div className="set-list-footer">
                    <Link to="/flashcards/create" className="btn">Create New Set</Link>
                </div>
            </div>
        </Container>
    );
}
