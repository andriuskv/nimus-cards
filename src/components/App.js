import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Home from "components/Home";
import ServiceWorkerPopup from "components/ServiceWorkerPopup";
import NoMatch from "components/NoMatch";

const Decks = lazy(() => import("components/Decks"));
const CreateDeck = lazy(() => import("components/CreateDeck"));
const StudyDeck = lazy(() => import("components/StudyDeck"));
const DeckStatus = lazy(() => import("components/DeckStatus"));

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
