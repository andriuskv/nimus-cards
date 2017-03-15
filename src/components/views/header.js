import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <nav className="header-nav">
                <ul className="header-nav-items">
                    <li className="header-nav-item">
                        <NavLink to="/" exact className="header-link" activeClassName="active">Home</NavLink>
                    </li>
                    <li className="header-nav-item">
                        <NavLink to="/flashcards/create" className="header-link" activeClassName="active">Create</NavLink>
                    </li>
                    <li className="header-nav-item">
                        <NavLink to="/flashcards" exact className="header-link" activeClassName="active">Flashcards</NavLink>
                    </li>
                    <li className="header-nav-item">
                        <NavLink to="/settings" className="header-link" activeClassName="active">Settings</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
