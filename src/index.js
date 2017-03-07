import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import App from "./components/views/app";
import Home from "./components/views/home";
import ListSetsContainer from "./components/containers/list-sets";
import CreateSetContainer from "./components/containers/create-set";
import StudySetContainer from "./components/containers/study-set";
import SettingsContainer from "./components/containers/settings";

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="flashcards" component={ListSetsContainer}></Route>
            <Route path="flashcards/create" component={CreateSetContainer}></Route>
            <Route path="flashcards/set/:id" component={StudySetContainer}></Route>
            <Route path="settings" component={SettingsContainer}></Route>
        </Route>
        <Route path="*" component={App}></Route>
    </Router>
, document.getElementById("app"));
