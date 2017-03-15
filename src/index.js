import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import Header from "./components/views/header";
import Home from "./components/views/home";
import ListSetsContainer from "./components/containers/list-sets";
import CreateSetContainer from "./components/containers/create-set";
import StudySetContainer from "./components/containers/study-set";
import SettingsContainer from "./components/containers/settings";

render(
    <HashRouter>
        <div className="app">
            <Header />
            <Route path="/" exact component={Home}></Route>
            <Route path="/flashcards" exact component={ListSetsContainer}></Route>
            <Route path="/flashcards/create" component={CreateSetContainer}></Route>
            <Route path="/flashcards/set/:id" component={StudySetContainer}></Route>
            <Route path="/settings" component={SettingsContainer}></Route>
        </div>
    </HashRouter>
, document.getElementById("app"));
