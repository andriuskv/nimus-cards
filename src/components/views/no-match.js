import React from "react";
import Container from "./container";

export default function NoMatch() {
    return (
        <Container>
            <div className="container">
                <p className="no-match-message">This page isn't available</p>
            </div>
        </Container>
    );
}
