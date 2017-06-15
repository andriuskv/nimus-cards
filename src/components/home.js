import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import Icon from "./icon";

export default function Home() {
    return (
        <Container>
            <section className="home-hero-container">
                <div className="container home-hero">
                    <h1 className="home-hero-title">NimusCards</h1>
                    <p className="home-hero-desc">
                        NimusCards is easy to use web based flashcard application with the goal of giving
                        users an ability to create, edit, and practice flashcards that are organized in decks.
                    </p>
                    <Link to="/flashcards/create" className="btn home-hero-btn">Get Started</Link>
                </div>
            </section>
            <section className="container home-feature-container">
                <h2 className="home-section-title">Features</h2>
                <div className="home-features">
                    <div className="home-features-item">
                        <Icon name="media" />
                        <h3 className="home-features-item-title">Media-Rich</h3>
                        <p className="home-feature-desc">Easily add images and sounds to your flashcards.</p>
                    </div>
                    <div className="home-features-item">
                        <Icon name="responsive" />
                        <h3 className="home-features-item-title">Responsive</h3>
                        <p className="home-feature-desc">
                            Responsive web design makes user experience consistent across
                            multiple devices.
                        </p>
                    </div>
                    <div className="home-features-item">
                        <Icon name="offline" />
                        <h3 className="home-features-item-title">Works Offline</h3>
                        <p className="home-feature-desc">
                            Even without connection, you can still use NimusCards.
                        </p>
                    </div>
                </div>
            </section>
        </Container>
    );
}
