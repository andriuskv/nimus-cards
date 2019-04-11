import Dexie from "dexie";

const db = new Dexie("nimus-cards-decks");

db.version(1).stores({
    decks: "++_id"
});

function fetchDecks() {
    return db.decks.toArray().catch(error => {
        console.log(error);
    });
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
    saveDeck,
    deleteDeck
};
