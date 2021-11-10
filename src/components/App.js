import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import ServiceWorkerPopup from "./ServiceWorkerPopup";
import NoMatch from "./NoMatch";

const Decks = lazy(() => import("./Decks"));
const CreateDeck = lazy(() => import("./CreateDeck"));
const StudyDeck = lazy(() => import("./StudyDeck"));
const DeckStatus = lazy(() => import("./DeckStatus"));

export default function App() {
  const location = useLocation();
  const [hideHeader, setHideHidden] = useState(false);

  useEffect(() => {
    const hideHeader = /\/decks\/.+?\/(learn|review|practice|preview)$/.test(location.pathname);

    setHideHidden(hideHeader);
  }, [location.pathname]);

  return (
    <>
      {hideHeader ? null : <Header/>}
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
    </>
  );
}
