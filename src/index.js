import "focus-visible";

import "normalize.css";
import "./styles/base.scss";

import { lazy, Suspense } from "react";
import { render } from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
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
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/decks" element={<Decks/>}/>
        <Route path="/decks/create" element={<CreateDeck/>}/>
        <Route path="/decks/:id/learn" element={<StudyDeck mode="learn"/>}/>
        <Route path="/decks/:id/review" element={<StudyDeck mode="review"/>}/>
        <Route path="/decks/:id/practice" element={<StudyDeck mode="practice"/>}/>
        <Route path="/decks/:id/preview" element={<StudyDeck mode="preview"/>}/>
        <Route path="/decks/:id/edit" element={<CreateDeck/>}/>
        <Route path="/decks/:id" element={<DeckStatus/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </Suspense>
    <ServiceWorkerPopup/>
  </HashRouter>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  initServiceWorker();
}
