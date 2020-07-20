import "focus-visible";

import "normalize.css";
import "./styles/base.scss";

import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ServiceWorkerPopup from "./components/ServiceWorkerPopup";
import NoMatch from "./components/NoMatch";

import { initServiceWorker } from "./services/service-worker";

const Decks = lazy(() => import("./components/Decks"));
const CreateDeck = lazy(() => import("./components/CreateDeck"));
const StudyDeck = lazy(() => import("./components/StudyDeck"));
const DeckStatus = lazy(() => import("./components/DeckStatus"));

render(
  <HashRouter>
    <Header/>
    <main className="container">
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/decks" exact component={Decks}/>
          <Route path="/decks/create" component={CreateDeck} key="create"/>
          <Route path="/decks/:id" exact component={DeckStatus}/>
          <Route path="/decks/:id/(learn|review|practice)" exact component={StudyDeck}/>
          <Route path="/decks/:id/edit" component={CreateDeck} key="edit"/>
          <Route component={NoMatch}/>
        </Switch>
      </Suspense>
      <ServiceWorkerPopup/>
    </main>
  </HashRouter>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  initServiceWorker();
}
