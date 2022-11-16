/** @jsxImportSource @emotion/react */
import React,{useState} from "react";
import { css } from "@emotion/react";
import KanbanColumn from "./KanbanColumn";

const newLocal = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;
export const COLUMN_KEY_TODO = "todo";
export const COLUMN_KEY_ONGONING = "ongoing";
export const COLUMN_KEY_DONE = "done";
export default function KanbanBoard({
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onRemove,
}) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
    const handleDrop = (evt) => {
    if (
      !draggedItem ||
      !dragSource ||
      !dragTarget ||
      dragSource === dragTarget
    ) {
      return;
    }
    dragSource&&onRemove(dragSource,draggedItem)
    dragTarget&&onAdd(dragTarget,draggedItem)
  };
  return (
    <main css={newLocal}>
      <KanbanColumn
        className="column-todo"
        title={"待处理"}
        setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_TODO : null)
        }
        setIsDragTarget={(isTarget) =>
          setDragTarget(isTarget ? COLUMN_KEY_TODO : null)
        }
        onDrop={handleDrop}
        cardList={todoList}
        setDraggedItem={setDraggedItem}
        canAddNew={true}
        onAdd={onAdd.bind(null,COLUMN_KEY_TODO)}
        onRemove={onRemove.bind(null,COLUMN_KEY_TODO)}
      ></KanbanColumn>
      <KanbanColumn
        className="column-ongoing"
        title={"进行中"}
        setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_ONGONING : null)
        }
        setIsDragTarget={(isTarget) =>
          setDragTarget(isTarget ? COLUMN_KEY_ONGONING : null)
        }
        onDrop={handleDrop}
        cardList={ongoingList}
        setDraggedItem={setDraggedItem}
        onAdd={onAdd.bind(null,COLUMN_KEY_ONGONING)}
        onRemove={onRemove.bind(null,COLUMN_KEY_ONGONING)}
      ></KanbanColumn>
      <KanbanColumn
        className="column-done"
        title={"已处理"}
        setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_DONE : null)
        }
        setIsDragTarget={(isTarget) =>
          setDragTarget(isTarget ? COLUMN_KEY_DONE : null)
        }
        onDrop={handleDrop}
        cardList={doneList}
        setDraggedItem={setDraggedItem}
        onAdd={onAdd.bind(null,COLUMN_KEY_DONE)}
        onRemove={onRemove.bind(null,COLUMN_KEY_DONE)}
      ></KanbanColumn>
    </main>
  );
}
