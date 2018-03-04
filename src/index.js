import "focus-visible";

import "./scss/index.scss";

import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import ListSetsContainer from "./containers/list-sets";
import CreateSetContainer from "./containers/create-set";
import StudySetContainer from "./containers/study-set";
import SettingsContainer from "./containers/settings";
import NoMatch from "./components/no-match";

render(
    <HashRouter>
        <div className="app">
            <Header />
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/flashcards" exact component={ListSetsContainer}></Route>
                <Route path="/flashcards/create" component={CreateSetContainer}></Route>
                <Route path="/flashcards/set/:id" component={StudySetContainer}></Route>
                <Route path="/settings" component={SettingsContainer}></Route>
                <Route component={NoMatch}></Route>
            </Switch>
        </div>
    </HashRouter>,
    document.getElementById("app")
);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(console.log);
}
