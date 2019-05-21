import "focus-visible";

import "./scss/normalize.css";
import "./scss/index.scss";

import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import ServiceWorkerPopup from "./components/service-worker-popup";
import NoMatch from "./components/no-match";

import { initServiceWorker } from "./services/service-worker";

const Decks = lazy(() => import("./components/decks/decks"));
const CreateDeck = lazy(() => import("./components/create-deck"));
const StudyDeck = lazy(() => import("./components/study-deck/study-deck"));
const Settings = lazy(() => import("./components/settings"));

render(
    <HashRouter>
        <Header />
        <main className="main">
            <Suspense fallback={<div></div>}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/decks" exact component={Decks} />
                    <Route path="/decks/create" component={CreateDeck} key="create" />
                    <Route path="/decks/:id" exact component={StudyDeck} />
                    <Route path="/decks/:id/edit" component={CreateDeck} key="edit" />
                    <Route path="/settings" component={Settings} />
                    <Route component={NoMatch} />
                </Switch>
            </Suspense>
            <ServiceWorkerPopup />
        </main>
    </HashRouter>,
    document.getElementById("app")
);

if ("serviceWorker" in navigator) {
    initServiceWorker();
}
