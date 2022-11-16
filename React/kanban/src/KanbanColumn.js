import React, { useState } from "react";
import KanbanCard from "./KanbanCard";
import AddKanbanCard from "./AddKanbanCard";
export default function KanbanColumn({
  className,
  title,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
  onDrop,
  setDraggedItem,
  cardList = [],
  canAddNew = false,
  onAdd,
  onRemove,
}) {
  const combinedClassName = `kanban-column ${className}`;
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (newCard) => {
    onAdd && onAdd(newCard);
    setShowAdd(false);
  };
  return (
    <section
      className={combinedClassName}
      onDragStart={() => setIsDragSource(true)}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
        setIsDragTarget(true);
      }}
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "none";
        setIsDragTarget(false);
      }}
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop(evt);
      }}
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
    >
      <h2>
        {title}
        {canAddNew && (
          <button disabled={showAdd} onClick={handleAdd}>
            &#8853;添加新卡片
          </button>
        )}
      </h2>
      <ul>
        {canAddNew&&showAdd&&<AddKanbanCard onSubmit={handleSubmit}></AddKanbanCard>}
        {cardList &&
          cardList.map((item) => (
            <KanbanCard
              {...item}
              key={item.title}
              onDragStart={() => setDraggedItem(item)}
              onRemove={onRemove}
            />
          ))}
      </ul>
    </section>
  );
}
