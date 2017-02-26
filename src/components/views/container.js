import React from "react";

export default function Container({ title, children }) {
    return (
        <main className="main">
            {title && <h2 className="container container-title">{title}</h2>}
            {children}
        </main>
    );
}
