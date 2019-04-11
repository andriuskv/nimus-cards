import React from "react";
import Icon from "../icon";
import TextSizeSelect from "./create-card-text-size-select";

export default function CreateCardBackSide(props) {
    const { card, addOption, handleTypeChange, handleTextSizeSelect, handleChange } = props;
    const { type, text, textSize, options, correct } = card.back;

    function renderAnswerType(type) {
        const { removeOption, markAnswerAsCorrect, handleAChange } = props;

        if (type === "text") {
            return (
                <textarea className="input create-side-text-input side-text"
                    name="back"
                    value={text}
                    style={{ fontSize: `${textSize}px` }}
                    onChange={handleChange}>
                </textarea>
            );
        }
        return (
            <ul>
                {options.map(({ text, id }, index) => (
                    <li className="create-option" key={id}>
                        <label>
                            <input type="radio" className="radio-input" name={card.id}
                                checked={correct === index}
                                onChange={() => markAnswerAsCorrect(index)} />
                            <div className="radio create-option-radio"
                                title="Mark answer as correct"></div>
                        </label>
                        <input type="text" className="input create-option-input" name={index} defaultValue={text}
                            autoComplete="off" onChange={handleAChange} />
                        <button className="btn-icon" title="Remove answer"
                            onClick={() => removeOption(index)}>
                            <Icon name="remove" />
                        </button>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className={`side-container ${props.visible ? " visible" : ""}`}>
            <div className="side-name">back</div>
            <div className="side">
                <div className="create-side-toolbar">
                    <ul className="create-side-types" onChange={handleTypeChange}>
                        <li className="create-side-type">
                            <label>
                                <input type="radio" className="radio-input" value="text"
                                    name={`type-${card.id}`}
                                    defaultChecked={type === "text"} />
                                <Icon name="text" title="Text" className="create-option-type-icon" />
                            </label>
                        </li>
                        <li className="create-side-type">
                            <label>
                                <input type="radio" className="radio-input" value="multi"
                                    name={`type-${card.id}`}
                                    defaultChecked={type === "multi"} />
                                <Icon name="list" title="Multiple choice" className="create-option-type-icon" />
                            </label>
                        </li>
                    </ul>
                    {type === "text" && <TextSizeSelect
                        sideName="back"
                        textSize={textSize}
                        handleTextSizeSelect={handleTextSizeSelect} />}
                    {type === "multi" && (
                        <button className="btn-icon" onClick={addOption} title="Add option">
                            <Icon name="addListItem" />
                        </button>
                    )}
                </div>
                <div className="side-content create-side-content">
                    {renderAnswerType(type)}
                </div>
            </div>
        </div>
    );
}
