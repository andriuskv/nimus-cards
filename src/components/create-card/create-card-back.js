import React, { useContext } from "react";
import { CreateDeckContext } from "../../context/CreateDeckContext";
import Icon from "../icon";
import TextSizeSelect from "./create-card-text-size-select";

export default function CreateCardBackSide({ index, handleChange }) {
    const { state, dispatch } = useContext(CreateDeckContext);
    const { back, id: cardId } = state.cards[index];
    const { type, text, textSize, options, correct } = back;

    function addOption() {
        dispatch({ type: "ADD_OPTION", index });
    }

    function removeOption(optionIndex, id) {
        dispatch({ type: "REMOVE_OPTION", index, optionIndex, id });
    }

    function markAnswerAsCorrect(optionIndex) {
        dispatch({
            type: "CHANGE_CORRECT_ANSWER",
            index,
            optionIndex
        });
    }

    function handleTypeChange({ target }) {
        dispatch({
            type: "CHANGE_ANSWER_TYPE",
            answerType: target.value,
            index
        });
    }

    function handleOptionTextChange({ target }) {
        const { name, value } = target;
        const option = back.options[name];

        if (value !== option.text) {
            dispatch({
                type: "UPDATE_OPTION_TEXT",
                optionIndex: parseInt(name, 10),
                index,
                value
            });
        }
    }

    function handleInputChange({ target }) {
        const { name, value, checked } = target;

        dispatch({
            type: "UPDATE_EXACT_ANSWER",
            name,
            value: name === "caseSensitive" ? checked : value,
            index
        });
    }

    function renderAnswerType(type) {
        if (type === "text") {
            return (
                <textarea className="input create-side-text-input side-text"
                    value={text}
                    style={{ fontSize: `${textSize}px` }}
                    onChange={event => handleChange(event, "back", "text")}>
                </textarea>
            );
        }
        else if (type === "exact") {
            return (
                <div onChange={handleInputChange}>
                    <label className="creact-exact-input-container">
                        <div className="creact-exact-input-title">Provide answer:</div>
                        <input type="text" className="input creact-exact-input" name="input" autoComplete="off"
                            defaultValue={back.input}/>
                    </label>
                    <label className="creact-exact-checkbox-container">
                        <input type="checkbox" className="checkbox-input" name="caseSensitive"
                            defaultChecked={back.caseSensitive} />
                        <div className="checkbox creact-exact-checkbox">
                            <div className="checkbox-tick"></div>
                        </div>
                        <span>Case sensitive</span>
                    </label>
                </div>
            );
        }
        return (
            <ul>
                {options.map(({ text, id }, index) => (
                    <li className="create-option" key={id}>
                        <label>
                            <input type="radio" className="radio-input" name={cardId}
                                checked={correct === index}
                                onChange={() => markAnswerAsCorrect(index)} />
                            <div className="radio create-option-radio"
                                title="Mark answer as correct"></div>
                        </label>
                        <input type="text" className="input create-option-input" name={index}
                            defaultValue={text} autoComplete="off" onChange={handleOptionTextChange} />
                        <button className="btn btn-icon" title="Remove answer"
                            onClick={() => removeOption(index, id)}>
                            <Icon name="remove" />
                        </button>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="side-container">
            <div className="create-side-name">BACK</div>
            <div className="side">
                <div className="create-side-toolbar">
                    <ul className="create-side-types" onChange={handleTypeChange}>
                        <li className="create-side-type">
                            <label>
                                <input type="radio" className="radio-input" value="text"
                                    name={`type-${cardId}`}
                                    defaultChecked={type === "text"} />
                                <Icon name="text" title="Text" className="create-option-type-icon" />
                            </label>
                        </li>
                        <li className="create-side-type">
                            <label>
                                <input type="radio" className="radio-input" value="multi"
                                    name={`type-${cardId}`}
                                    defaultChecked={type === "multi"} />
                                <Icon name="list" title="Multiple choice" className="create-option-type-icon" />
                            </label>
                        </li>
                        <li className="create-side-type">
                            <label>
                                <input type="radio" className="radio-input" value="exact"
                                    name={`type-${cardId}`}
                                    defaultChecked={type === "exact"} />
                                <Icon name="text-short" title="Exact answer" className="create-option-type-icon" />
                            </label>
                        </li>
                    </ul>
                    {type === "text" && <TextSizeSelect
                        textSize={textSize}
                        handleChange={event => handleChange(event, "back", "textSize")} />
                    }
                    {type === "multi" && (
                        <button className="btn btn-icon" onClick={addOption} title="Add option">
                            <Icon name="add-list-item" />
                        </button>
                    )}
                </div>
                <div className="create-side-content">
                    {renderAnswerType(type)}
                </div>
            </div>
        </div>
    );
}
