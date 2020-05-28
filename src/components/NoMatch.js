import React from "react";
import { setDocumentTitle } from "../helpers";

export default function NoMatch({ message }) {
  React.useEffect(() => {
    setDocumentTitle("Page not found");
  }, [message]);

  return <p className="no-match-message">{message || "This page is not available."}</p>;
}
