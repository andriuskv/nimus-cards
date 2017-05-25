import Dexie from "dexie";

const db = new Dexie("nimus-cards-sets");

db.version(1).stores({
    sets: "++_id"
});

function getSets() {
    return db.sets.toArray()
        .catch(error => {
            console.log(error);
        });
}

function addSet(set) {
    db.sets.put(set)
    .catch(error => {
        console.log(error);
    });
}

function removeSet(id) {
    db.sets.delete(id)
    .catch(error => {
        console.log(error);
    });
}

export {
    getSets,
    addSet,
    removeSet
};
