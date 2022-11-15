import React from "react";

export default function KanbanColumn({
  children, className, title, setIsDragSource = () => { }, setIsDragTarget = () => { }, onDrop,
}) {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section
      className={combinedClassName}
      onDragStart={() => setIsDragSource(true)}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
        setIsDragTarget(true);
      } }
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "none";
        setIsDragTarget(false);
      } }
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop(evt);
      } }
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      } }
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}
