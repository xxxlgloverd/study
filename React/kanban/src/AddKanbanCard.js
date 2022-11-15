import React, { useEffect, useState, useRef } from "react";

export const AddKanbanCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === "Enter")
      onSubmit(title);
  };
  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  });
  return (
    <li className="kanban-card">
      <h4>添加新卡片</h4>
      <div className="card-title">
        <input
          ref={inputElem}
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
    </li>
  );
};
