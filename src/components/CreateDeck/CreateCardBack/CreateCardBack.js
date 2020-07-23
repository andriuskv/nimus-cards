import React from "react";
import { getRandomString } from "../../../helpers";
import Icon from "../../Icon";

export default function CreateCardBack({ side, updateCardBack }) {
  const { type, textOptions, multiOptions, exactOptions } = side;

  function handleChange({ target }) {
    const { value } = target;

    if (value !== side.value) {
      textOptions.value = value;
      updateCardBack({ textOptions });
    }
  }

  function handleTypeChange({ target }) {
    updateCardBack({ type: target.value });
  }

  function addOption() {
    if (multiOptions.options.length < 8) {
      multiOptions.options.push({ id: getRandomString() });
      updateCardBack({ multiOptions });
    }
  }

  function removeOption(optionIndex) {
    multiOptions.options.splice(optionIndex, 1);
    updateCardBack({ multiOptions });
  }

  function changeOptionLayout({ target }) {
    multiOptions.layout = target.value;
    updateCardBack({ multiOptions });
  }

  function markAnswerAsCorrect(id) {
    multiOptions.correctId = id;
    updateCardBack({ multiOptions });
  }

  function handleOptionTextChange({ target }) {
    const { name, value } = target;
    const option = multiOptions.options[name];

    if (value !== option.value) {
      option.value = value;
      updateCardBack({ multiOptions });
    }
  }

  function handleInputChange({ target }) {
    const { name, value, checked } = target;

    if (name === "caseSensitive") {
      exactOptions.caseSensitive = checked;
    }
    else {
      exactOptions.value = value;
    }
    updateCardBack({ exactOptions });
  }

  function renderTextAnswerType() {
    return (
      <textarea className="input create-side-text-input"
        value={textOptions.value}
        onChange={event => handleChange(event, "value")}>
      </textarea>
    );
  }

  function renderExactAnswerType() {
    return (
      <div onChange={handleInputChange}>
        <label className="create-exact-input-container">
          <div className="create-exact-input-title">Provide an answer:</div>
          <input type="text" className="input create-exact-input" name="input"
            autoComplete="off"
            defaultValue={exactOptions.value}/>
        </label>
        <label className="checkbox-container create-exact-checkbox-container">
          <input type="checkbox" className="sr-only checkbox-input"
            name="caseSensitive"
            defaultChecked={exactOptions.caseSensitive}/>
          <div className="checkbox">
            <div className="checkbox-tick"></div>
          </div>
          <span className="checkbox-label">Case sensitive</span>
        </label>
      </div>
    );
  }

  function renderMultiAnswerType() {
    return (
      <>
        <div className="create-multi-layout">
          <div className="create-multi-layout-title">Layout</div>
          <div onInput={changeOptionLayout} className="create-multi-layout-items">
            <label className="create-multi-layout-item">
              <input type="radio" className="sr-only create-type-radio"
                name="multi-select" value="short"
                defaultChecked={multiOptions.layout === "short"}/>
              <Icon name="grid" className="create-option-type-icon"/>
            </label>
            <label className="create-multi-layout-item">
              <input type="radio" className="sr-only create-type-radio"
                name="multi-select" value="medium"
                defaultChecked={multiOptions.layout === "medium"}/>
              <Icon name="list-2-col" className="create-option-type-icon"/>
            </label>
            <label className="create-multi-layout-item">
              <input type="radio" className="sr-only create-type-radio"
                name="multi-select" value="long"
                defaultChecked={multiOptions.layout === "long"}/>
              <Icon name="menu" className="create-option-type-icon"/>
            </label>
          </div>
        </div>
        <ul>
          {multiOptions.options.map(({ id, value }, index) => (
            <li className="create-option" key={id}>
              <label>
                <input type="radio" className="sr-only radio-input" name="multi-option"
                  checked={multiOptions.correctId === id}
                  onChange={() => markAnswerAsCorrect(id)}/>
                <div className="radio" title="Mark answer as correct"></div>
              </label>
              <input type="text" className="input create-option-input" name={index}
                defaultValue={value} autoComplete="off" onChange={handleOptionTextChange}/>
              <button className="btn btn-icon" title="Remove answer"
                onClick={() => removeOption(index)}>
                <Icon name="remove"/>
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  function renderAnswerType(type) {
    if (type === "text") {
      return renderTextAnswerType();
    }
    else if (type === "multi") {
      return renderMultiAnswerType();
    }
    else if (type === "exact") {
      return renderExactAnswerType();
    }
    return null;
  }

  return (
    <div className="create-card-side">
      <div className="create-side-toolbar">
        <ul className="create-side-types" onChange={handleTypeChange}>
          <li className="create-side-type">
            <label>
              <input type="radio" className="sr-only create-type-radio"
                name="type-select" value="text"
                defaultChecked={type === "text"}/>
              <Icon name="text" title="Text" className="create-option-type-icon"/>
            </label>
          </li>
          <li className="create-side-type">
            <label>
              <input type="radio" className="sr-only create-type-radio"
                name="type-select" value="multi"
                defaultChecked={type === "multi"}/>
              <Icon name="list-checkbox" title="Multiple choice" className="create-option-type-icon"/>
            </label>
          </li>
          <li className="create-side-type">
            <label>
              <input type="radio" className="sr-only create-type-radio"
                name="type-select" value="exact"
                defaultChecked={type === "exact"}/>
              <Icon name="text-short" title="Exact answer" className="create-option-type-icon"/>
            </label>
          </li>
        </ul>
        {type === "multi" && (
          <button className="btn btn-icon" onClick={addOption} title="Add option"
            disabled={multiOptions.options.length >= 8}>
            <Icon name="add-list-item"/>
          </button>
        )}
      </div>
      <div className="create-side-content">
        {renderAnswerType(type)}
        {side.error?.message && <div className="create-side-message">{side.error.message}</div>}
      </div>
    </div>
  );
}
