import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomString } from "../../helpers";
import Icon from "../Icon";
import "./dropdown.scss";

export default function Dropdown({ children }) {
  const [{ id, visible }, setDropdownState] = useState({ id: "", visible: false });
  const memoizedWindowClickHandler = useCallback(handleWindowClick, [id]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setDropdownState({ visible, id: getRandomString() });

    return () => {
      isMounted.current = false;
      window.removeEventListener("click", memoizedWindowClickHandler);
    };
  }, []);

  function handleMenuClick() {
    if (visible) {
      window.removeEventListener("click", memoizedWindowClickHandler);
    }
    else {
      window.addEventListener("click", memoizedWindowClickHandler);
    }
    setDropdownState({ id, visible: !visible });
  }

  function handleWindowClick({ target }) {
    const closestContainer = target.closest(".dropdown-container");
    let hideDropdown = true;

    if (closestContainer && closestContainer.id === id) {
      hideDropdown = target.closest(".dropdown-btn");
    }

    if (hideDropdown) {
      if (isMounted.current) {
        setDropdownState({ id, visible: false });
      }
      window.removeEventListener("click", memoizedWindowClickHandler);
    }
  }

  return (
    <div id={id} className="dropdown-container">
      <button className="btn btn-icon" onClick={handleMenuClick}>
        <Icon name="dots-vertical"/>
      </button>
      {visible && <div className="dropdown">{children}</div>}
    </div>
  );
}
