import { Link, NavLink } from "react-router-dom";
import Icon from "components/Icon";
import "./header.css";

export default function Header() {
  function getLinkClassName({ isActive }) {
    let className = "header-link";

    if (isActive) {
      className += " active";
    }
    return className;
  }
  return (
    <header className="header">
      <nav className="max-width-limit header-nav">
        <Link to="/" className="header-logo-link">
          <Icon name="cards" className="header-logo-icon"/>
          <span>NimusCards</span>
        </Link>
        <ul className="header-nav-items">
          <li>
            <NavLink to="/decks" end className={getLinkClassName}>Decks</NavLink>
          </li>
          <li>
            <NavLink to="/decks/create" className={getLinkClassName}>Create</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
