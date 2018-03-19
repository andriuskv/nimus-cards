import Dexie from "dexie";

const db = new Dexie("nimus-cards-sets");

db.version(1).stores({
    sets: "++_id"
});

function getDecks() {
    return db.sets.toArray().catch(error => {
        console.log(error);
    });
}

function addDeck(set) {
    db.sets.put(set).catch(error => {
        console.log(error);
    });
}

function removeDeck(id) {
    db.sets.delete(id).catch(error => {
        console.log(error);
    });
}

export {
    getDecks,
    addDeck,
    removeDeck
};
