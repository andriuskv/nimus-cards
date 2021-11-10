import { useState, useEffect } from "react";

export default function ServiceWorkerPopup() {
  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    window.addEventListener("sw-state-change", ({ detail }) => {
      if (detail === "init") {
        showPopup({
          message: "Content is cached for offline use.",
          name: detail
        });
      }
      else if (detail === "update") {
        showPopup({
          message: "Update is available, please refresh.",
          name: detail
        });
      }
    });
  }, []);

  function showPopup(popup) {
    setVisible(true);
    setPopup(popup);

    setTimeout(() => {
      setVisible(false);
    }, 8000);
  }

  function hidePopup() {
    setVisible(false);
  }

  function reloadPage() {
    window.location.reload();
  }

  return (
    <div className={`service-worker-popup${visible ? " visible" : ""}`}>
      {popup && (
        <>
          <p>{popup.message}</p>
          {popup.name === "init" ? (
            <button className="btn btn-text service-worker-popup-action-btn" onClick={hidePopup}>Dismiss</button>
          ) : (
            <button className="btn btn-text service-worker-popup-action-btn" onClick={reloadPage}>Reload</button>
          )}
        </>
      )}
    </div>
  );
}
