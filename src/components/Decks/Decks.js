import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./decks.scss";
import { getRandomString, setDocumentTitle, getCardsToLearn, getCardsToReview } from "../../helpers";
import { fetchDecks, deleteDeck, saveDeck } from "../../services/db";
import Header from "../Header";
import Icon from "../Icon";
import DeckRemoveModal from "./DeckRemoveModal";
import GlobalSettings from "./GlobalSettings";
import DeckSettings from "./DeckSettings";
import Deck from "./Deck";

export default function Decks() {
  const [decks, setDecks] = useState([]);
  const [modal, setModal] = useState({ visible: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDecks().then(decks => {
      setDecks(decks.map(deck => {
        deck.hasCardsToLearn = !!getCardsToLearn(deck.cards).length;
        deck.hasCardsToReview = !!getCardsToReview(deck.cards).length;
        return deck;
      }));
      setLoading(false);
      setDocumentTitle("Your decks");
    });
  }, []);

  function findDeckIndex(decks, deckId) {
    return decks.findIndex(({ id }) => id === deckId);
  }

  function removeDeck() {
    const index = findDeckIndex(decks, modal.id);

    decks.splice(index, 1);
    setDecks([...decks]);
    deleteDeck(modal.id);
    hideModal();
  }

  function showDialog(id) {
    setModal({ deckRemoveModalVisible: true, id });
  }

  function showSettingsModal() {
    setModal({ settingsVisible: true });
  }

  function showDeckSettings(deck) {
    setModal({ deckSettingsVisible: true, deck });
  }

  function hideModal() {
    setModal({});
  }

  async function exportDeck(deck) {
    const [{ default: saveAs }, { default: JSZip }] = await Promise.all([
      import("file-saver"),
      import("jszip")
    ]);
    const zip = new JSZip();
    const folder = zip.folder(deck.title);

    folder.file("metadata.json", JSON.stringify({
      title:  deck.title,
      description:  deck.description
    }, null, 2));

    deck.cards.forEach((card, index) => {
      const currentAttachment = card.front.attachment;
      let newAttachment = undefined;

      if (currentAttachment) {
        if (currentAttachment.blob) {
          newAttachment = {
            type: currentAttachment.type,
            description: currentAttachment.description,
            mimeType: currentAttachment.blob.type,
            blobName: currentAttachment.blob.name
          };
          folder.file(currentAttachment.blob.name, new Blob([currentAttachment.blob], {
            type: currentAttachment.blob.type
          }));
        }
        else {
          newAttachment = currentAttachment;
        }
      }
      folder.file(`${index}.json`, JSON.stringify({
        ...card,
        front: { ...card.front, attachment: newAttachment }
      }, null, 2));
    });
    const archive = await zip.generateAsync({ type:"blob" });
    saveAs(archive, `${deck.title}.zip`);
  }

  async function importDeck({ target }) {
    const [file] = target.files;
    const { default: JSZip } = await import("jszip");
    const zip = await JSZip.loadAsync(file);
    const deck = {
      id: getRandomString(),
      title: "",
      description: "",
      createdAt: Date.now(),
      cards: []
    };

    for (const [path, file] of Object.entries(zip.files)) {
      if (path.endsWith("/metadata.json")) {
        const metadata = JSON.parse(await file.async("string"));

        Object.assign(deck, metadata);
      }
      else if (path.endsWith(".json")) {
        const card = JSON.parse(await file.async("string"));
        const attachment = card.front.attachment;
        card.id = getRandomString();

        if (attachment && attachment.blobName) {
          const { blobName } = attachment;
          const file = zip.files[`${deck.title}/${blobName}`];

          attachment.blob = new File([await file.async("blob")], blobName, {
            type: attachment.mimeType
          });
          delete attachment.blobName;
          delete attachment.mimeType;
        }
        deck.cards.push(card);
      }
    }
    setDecks([...decks, deck]);
    saveDeck(deck);
    target.value = "";
  }

  function renderDecks(decks) {
    return decks.map(deck => (
      <Deck key={deck.id} deck={deck}
        showDialog={showDialog}
        showDeckSettings={showDeckSettings}
        exportDeck={exportDeck}/>
    ));
  }

  return (
    <>
      <Header/>
      <div className="container max-width-limit">
        <div className="decks-header">
          <h1 className="decks-title">Your Decks</h1>
          <Link to="/decks/create" className="btn deck-create-link">Create</Link>
        </div>
        <div className="decks-top-bar">
          <label className="btn btn-icon-text decks-top-bar-item deck-import-input-container">
            <Icon name="import"/>
            <span>Import</span>
            <input type="file" className="sr-only" onChange={importDeck}/>
          </label>
          <button className="btn btn-icon-text decks-top-bar-item" onClick={showSettingsModal}>
            <Icon name="settings"/>
            <span>Settings</span>
          </button>
        </div>
        {loading ? "" : decks.length ?
          <ul className="decks">{renderDecks(decks)}</ul> :
          <h2 className="decks-message">You have no decks</h2>
        }
        {modal.deckRemoveModalVisible && <DeckRemoveModal removeDeck={removeDeck} cancelRemoval={hideModal}/>}
        {modal.settingsVisible && <GlobalSettings hide={hideModal}/>}
        {modal.deckSettingsVisible && <DeckSettings hide={hideModal} deck={modal.deck}/>}
      </div>
    </>
  );
}
