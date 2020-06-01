import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import Icon from "../Icon";

export default function Home() {
  React.useEffect(() => {
    document.title = "NimusCards";
  }, []);

  return (
    <>
      <div className="home-hero">
        <h1 className="home-hero-title">NimusCards</h1>
        <p className="home-hero-desc">Simple learning with flashcards.</p>
        <Link to="/decks/create" className="btn home-hero-btn">Get Started</Link>
      </div>
      <h2 className="home-features-title">Features</h2>
      <ul className="home-features">
        <li className="home-feature">
          <Icon name="media" className="home-icon" />
          <h3 className="home-feature-title">Media-Rich</h3>
          <p>Easily add images and sounds to your flashcards.</p>
        </li>
        <li className="home-feature">
          <Icon name="responsive" className="home-icon" />
          <h3 className="home-feature-title">Responsive</h3>
          <p>Responsive web design makes user experience consistent across multiple devices.</p>
        </li>
        <li className="home-feature">
          <Icon name="offline" className="home-icon" />
          <h3 className="home-feature-title">Works Offline</h3>
          <p>Even without connection, you can still use NimusCards.</p>
        </li>
      </ul>
    </>
  );
}