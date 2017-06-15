import React from "react";

export default function Container({ title, children }) {
    return (
        <main className="main">
            {title && <h1 className="container-title">{title}</h1>}
            {children}
        </main>
    );
}
