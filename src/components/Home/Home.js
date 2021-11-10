import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Icon from "../Icon";
import "./home.scss";

export default function Home() {
  useEffect(() => {
    document.title = "NimusCards";
  }, []);

  return (
    <>
      <Header/>
      <div className="container max-width-limit">
        <div className="home-hero">
          <div className="home-icon-container home-hero-icon-container">
            <Icon name="cards" className="home-icon home-hero-icon"/>
          </div>
          <h1 className="home-hero-title">NimusCards</h1>
          <p className="home-hero-desc">Simple learning with flashcards</p>
          <Link to="/decks/create" className="btn home-hero-btn">Get Started</Link>
        </div>
        <h2 className="home-features-title">Features</h2>
        <ul className="home-features">
          <li className="home-feature">
            <div className="home-icon-container">
              <Icon name="repetition" className="home-icon"/>
            </div>
            <h3 className="home-feature-title">Spaced Repetition</h3>
            <p>With spaced repetition you learn more effectively and retain learned material for longer.</p>
          </li>
          <li className="home-feature">
            <div className="home-icon-container">
              <Icon name="media" className="home-icon"/>
            </div>
            <h3 className="home-feature-title">Media-Rich</h3>
            <p>Easily augment your flashcards with images, sounds or videos.</p>
          </li>
          <li className="home-feature">
            <div className="home-icon-container">
              <Icon name="offline" className="home-icon"/>
            </div>
            <h3 className="home-feature-title">Works Offline</h3>
            <p>Even without internet connection you can still use NimusCards.</p>
          </li>
        </ul>
      </div>
    </>
  );
}
