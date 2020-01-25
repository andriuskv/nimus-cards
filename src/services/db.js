import Dexie from "dexie";

const db = new Dexie("nimus-cards");

db.version(1).stores({ decks: "id" });

function fetchDecks() {
    return db.decks.toArray().catch(error => {
        console.log(error);
    });
}

function fetchDeck(id) {
    return db.decks.get(id);
}

function saveDeck(set) {
    db.decks.put(set).catch(error => {
        console.log(error);
    });
}

function deleteDeck(id) {
    db.decks.delete(id).catch(error => {
        console.log(error);
    });
}

export {
    fetchDecks,
    fetchDeck,
    saveDeck,
    deleteDeck
};
