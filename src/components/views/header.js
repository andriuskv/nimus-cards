import React from "react";
import { IndexLink, Link } from "react-router";

export default function Header() {
    return (
        <header className="header">
            <nav className="header-nav">
                <ul className="header-nav-items">
                    <li className="header-nav-item">
                        <IndexLink to="/" className="header-link" activeClassName="active">Home</IndexLink>
                    </li>
                    <li className="header-nav-item">
                        <Link to="flashcards/create" className="header-link" activeClassName="active">Create</Link>
                    </li>
                    <li className="header-nav-item">
                        <Link to="flashcards" className="header-link" activeClassName="active">Flashcards</Link>
                    </li>
                    <li className="header-nav-item">
                        <Link to="settings" className="header-link" activeClassName="active">Settings</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
