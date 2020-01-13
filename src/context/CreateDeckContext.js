import React, { createContext, useContext, useReducer, useMemo } from "react";
import { getRandomString } from "../helpers";

const CreateDeckContext = createContext(null);

function CreateDeckProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        title: "",
        description: "",
        cards: []
    });
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <CreateDeckContext.Provider value={value}>
            {children}
        </CreateDeckContext.Provider>
    );
}

function useStore() {
    return useContext(CreateDeckContext);
}

function reducer(state, action) {
    const card = state.cards[action.index];

    switch (action.type) {
        case "RESET_DECK":
            return { ...action.deck };
        case "UPDATE_DECK":
            return { ...state, [action.name]: action.value };
        case "ADD_CARD":
            return { ...state, cards: [...state.cards, action.card] };
        case "REMOVE_CARD":
            state.cards.splice(action.index, 1);
            return { ...state };
        case "UPDATE_CARD_VALUE":
            card[action.name][action.key] = action.value;
            return { ...state };
        case "ADD_ATTACHMENT":
            card.front.attachment = action.attachment;
            return { ...state };
        case "REMOVE_ATTACHMENT":
            delete card.front.attachment;
            return { ...state };
        case "CHANGE_ANSWER_TYPE":
            card.back.type = action.answerType;
            return { ...state };
        case "ADD_OPTION":
            card.back.options.push({ id: getRandomString() });
            return { ...state };
        case "REMOVE_OPTION":
            card.back.correct = 0;
            card.back.options.splice(action.optionIndex, 1);
            return { ...state };
        case "CHANGE_CORRECT_ANSWER":
            card.back.correct = action.optionIndex;
            return { ...state };
        case "TOGGLE_USE_GRID":
            card.back.useGrid = !card.back.useGrid;
            return { ...state };
        case "UPDATE_OPTION_TEXT":
            card.back.options[action.optionIndex].text = action.value;
            return { ...state };
        case "UPDATE_EXACT_ANSWER":
            card.back[action.name] = action.value;
            return { ...state };
        default:
            return state;
    }
}

export {
    CreateDeckProvider,
    useStore
};
