import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";

export default function Home() {
    return (
        <Container>
            <div className="home">
                <section className="home-main">
                    <h2 className="container container-title home-main-title">About NimusCards</h2>
                    <article className="container home-main-desc"></article>
                </section>
                <aside className="container home-aside">
                    <p>Make new set</p>
                    <Link to="/flashcards/create" className="btn">Create Set</Link>
                </aside>
            </div>
        </Container>
    );
}
