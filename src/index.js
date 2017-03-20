import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/views/header";
import Home from "./components/views/home";
import ListSetsContainer from "./components/containers/list-sets";
import CreateSetContainer from "./components/containers/create-set";
import StudySetContainer from "./components/containers/study-set";
import SettingsContainer from "./components/containers/settings";
import NoMatch from "./components/views/no-match";

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
    </HashRouter>
, document.getElementById("app"));
