import "focus-visible";

import "./scss/index.scss";

import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import DecksContainer from "./containers/decks";
import CreateDeckContainer from "./containers/create-deck";
import StudyDeckContainer from "./containers/study-deck";
import SettingsContainer from "./containers/settings";
import NoMatch from "./components/no-match";

render(
    <HashRouter>
        <React.Fragment>
            <Header />
            <main className="main">
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/decks" exact component={DecksContainer}></Route>
                    <Route path="/decks/create" component={CreateDeckContainer}></Route>
                    <Route path="/decks/:id" component={StudyDeckContainer}></Route>
                    <Route path="/settings" component={SettingsContainer}></Route>
                    <Route component={NoMatch}></Route>
                </Switch>
            </main>
        </React.Fragment>
    </HashRouter>,
    document.getElementById("app")
);

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("./sw.js").catch(console.log);
// }
