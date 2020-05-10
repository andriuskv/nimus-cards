import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./decks.scss";
import { getRandomString } from "../../helpers";
import { fetchDecks, deleteDeck, saveDeck } from "../../services/db";
import Icon from "../Icon";
import DeckRemovalDialog from "./DeckRemovalDialog";
import Settings from "./Settings";
import Deck from "./Deck";

export default function Decks(props) {
    const [decks, updateDecks] = useState([]);
    const [dialog, toggleDialog] = useState({ visible: false });
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDecks().then(decks => {
            updateDecks(decks);
            setLoading(false);
        });
    }, []);

    function findDeckIndex(decks, deckId) {
        return decks.findIndex(({ id }) => id === deckId);
    }

    function editDeck(deck) {
        props.history.push(`/decks/${deck.id}/edit`);
    }

    function removeDeck() {
        const index = findDeckIndex(decks, dialog.deck.id);

        decks.splice(index, 1);
        updateDecks([...decks]);
        deleteDeck(dialog.deck.id);
        hideDialog();
    }

    function showDialog(deck) {
        toggleDialog({ visible: true, deck });
    }

    function hideDialog() {
        toggleDialog({ visible: false, deck: null });
    }

    async function exportDeck(deck) {
        const [{ saveAs }, { default: JSZip }] = await Promise.all([
            import("file-saver"),
            import("jszip")
        ]);
        const zip = new JSZip();
        const folder = zip.folder(deck.title);

        folder.file("description.txt", deck.description);

        deck.cards.forEach((card, index) => {
            let att = card.front.attachment;

            if (att) {
                att = { ...att };
                folder.file(att.file.name, new Blob([att.file], { type: att.file.type }));
                att.mimeType = att.file.type;
                att.file = att.file.name;
            }
            folder.file(`${index}.json`, JSON.stringify({
                ...card,
                front: { ...card.front, attachment: att }
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
            cards: []
        };

        for (const [path, file] of Object.entries(zip.files)) {
            if (path.endsWith("/")) {
                deck.title = path.slice(0, -1);
                const desc = zip.files[`${deck.title}/description.txt`];

                if (desc) {
                    deck.description = await desc.async("string");
                }
            }
            else if (path.endsWith(".json")) {
                const card = JSON.parse(await file.async("string"));
                const attachment = card.front.attachment;
                card.id = getRandomString();

                if (attachment) {
                    const fileName = attachment.file;
                    const att = zip.files[`${deck.title}/${fileName}`];

                    attachment.file = new File([await att.async("blob")], fileName, {
                        type: attachment.mimeType
                    });
                    delete attachment.mimeType;
                }
                deck.cards.push(card);
            }
        }
        updateDecks([...decks, deck]);
        saveDeck(deck);
        target.value = "";
    }

    function showSettingsModal() {
        setSettingsModalVisible(true);
    }

    function hideSettingsModal() {
        setSettingsModalVisible(false);
    }

    function renderDecks(decks) {
        return decks.map(deck => (
            <Deck key={deck.id} deck={deck}
                showDialog={showDialog}
                editDeck={editDeck}
                exportDeck={exportDeck}/>
        ));
    }

    return (
        <Fragment>
            <div className="decks-header">
                <h1 className="decks-title">Your Decks</h1>
                <Link to="/decks/create" className="btn deck-create-link">Create</Link>
            </div>
            <div className="decks-top-bar">
                <label className="btn btn-icon decks-top-bar-item deck-import-input-container">
                    <Icon name="import"/>
                    <span>Import</span>
                    <input type="file" className="sr-only" onChange={importDeck}/>
                </label>
                <button className="btn btn-icon decks-top-bar-item" onClick={showSettingsModal}>
                    <Icon name="settings"/>
                    <span>Settings</span>
                </button>
            </div>
            {loading ? "" : decks.length ?
                <ul>{renderDecks(decks)}</ul> :
                <h2 className="deck-list-message">You have no decks</h2>
            }
            {dialog.visible && (
                <DeckRemovalDialog
                    deckTitle={dialog.deck.title}
                    removeDeck={removeDeck}
                    cancelRemoval={hideDialog}/>
            )}
            {settingsModalVisible && <Settings hide={hideSettingsModal}/>}
        </Fragment>
    );
}
