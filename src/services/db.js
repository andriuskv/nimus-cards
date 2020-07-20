import Dexie from "dexie";

const db = new Dexie("nimus-cards");

db.version(1).stores({ decks: "id" });

function fetchDecks() {
  return db.decks.toArray()
    .then(sortDecks)
    .catch(error => {
      console.log(error);
    });
}

function fetchDeck(id) {
  return db.decks.get(id);
}

function saveDeck(deck) {
  db.decks.put(deck).catch(error => {
    console.log(error);
  });
}

function deleteDeck(id) {
  db.decks.delete(id).catch(error => {
    console.log(error);
  });
}

function sortDecks(decks) {
  return decks.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    else if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  });
}

export {
  fetchDecks,
  fetchDeck,
  saveDeck,
  deleteDeck
};
