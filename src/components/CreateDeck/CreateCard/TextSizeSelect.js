import React from "react";

export default function TextSizeSelect({ textSize, handleChange }) {
  return (
    <select className="input create-side-select" title="Text size"
      defaultValue={textSize} onChange={handleChange}>
      <option value="16">16px</option>
      <option value="24">24px</option>
      <option value="36">36px</option>
      <option value="48">48px</option>
    </select>
  );
}
