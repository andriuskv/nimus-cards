import React from "react";
import Container from "./container";

export default function NoMatch() {
    return (
        <Container>
            <p className="no-match-message">This page isn't available</p>
        </Container>
    );
}
