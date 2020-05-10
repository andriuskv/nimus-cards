import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import Icon from "../Icon";

export default function Header() {
    return (
        <header className="header">
            <nav className="header-nav">
                <Link to="/" className="header-logo-link">
                    <Icon name="cards" className="header-logo-icon"/>
                    <span>NimusCards</span>
                </Link>
                <ul className="header-nav-items">
                    <li className="header-nav-item">
                        <NavLink to="/decks" exact className="header-link" activeClassName="active">Decks</NavLink>
                    </li>
                    <li className="header-nav-item">
                        <NavLink to="/decks/create" className="header-link" activeClassName="active">Create</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
