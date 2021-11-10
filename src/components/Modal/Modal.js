import { useEffect, useCallback } from "react";
import "./modal.scss";

export default function Modal({ className, hide, children }) {
  const memoizedKeyDownHandler = useCallback(handleKeydown, []);

  useEffect(() => {
    window.addEventListener("keydown", memoizedKeyDownHandler);

    return () => {
      window.removeEventListener("keydown", memoizedKeyDownHandler);
    };
  }, []);

  function handleClick({ target, currentTarget }) {
    if (target === currentTarget) {
      hide();
    }
  }

  function handleKeydown({ key }) {
    if (key === "Escape") {
      hide();
    }
  }

  return (
    <div className="modal-mask" onClick={handleClick}>
      <div className={`modal${className ? ` ${className}` : ""}`}>{children}</div>
    </div>
  );
}
