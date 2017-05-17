import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import Icon from "./icon";

export default function Home() {
    return (
        <Container>
            <div className="home">
                <section>
                    <h3 className="home-title">What is NimusCards?</h3>
                    <p className="home-desc">
                        NimusCards is easy to use web based flashcard application with the goal of giving
                        users an ability to create, edit, and practice flashcards that are organized in dects.
                    </p>
                    <p className="home-desc">
                        You can start by creating new flashcard set <Link to="/flashcards/create">here</Link>.
                    </p>
                </section>
                <section className="home-feature-container">
                    <h3 className="home-title">Features</h3>
                    <div className="home-features">
                        <div className="home-features-item">
                            <Icon name="media" />
                            <h4 className="home-features-item-title">Media-Rich</h4>
                            <p className="home-feature-desc">Easily add images and sounds to your flashcards.</p>
                        </div>
                        <div className="home-features-item">
                            <Icon name="responsive" />
                            <h4 className="home-features-item-title">Responsive</h4>
                            <p className="home-feature-desc">
                                Responsive web design makes user experience consistent across
                                multiple devices.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Container>
    );
}
