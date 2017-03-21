import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";

export default function Home() {
    return (
        <Container>
            <div className="home">
                <h3 className="home-title">Why Flashcards?</h3>
                <p className="home-desc">
                    Flashcards are the fastest and best way to memorize almost any type of information.
                    Whether you're memorizing multiplication tables, vocabulary lists, a new language,
                    or just plain old definitions, flashcards will help you organize the information
                    in a way that helps you learn more efficiently.
                    NimusCards is especially useful because it utilize the
                    <a href="https://en.wikipedia.org/wiki/Leitner_system"> Leitner system</a> of studying.
                </p>
                <p className="home-desc">You can start by creating new flashcard set <Link to="/flashcards/create">here</Link>.</p>
            </div>
        </Container>
    );
}
