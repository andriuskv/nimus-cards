import React, { createContext, useReducer } from "react";
import { getRandomString } from "../helpers";

const CreateDeckContext = createContext(null);

function CreateDeckProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        title: "",
        description: "",
        cards: []
    });

    return (
        <CreateDeckContext.Provider value={{ state, dispatch }}>
            {children}
        </CreateDeckContext.Provider>
    );
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
        case "UPDATE_SIDE_VALUE":
            card[action.side][action.key] = action.value;
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
        case "UPDATE_OPTION_TEXT":
            card.back.options[action.optionIndex].text = action.value;
            return { ...state };
        default:
            return state;
    }
}

export {
    CreateDeckContext,
    CreateDeckProvider,
    reducer
};
