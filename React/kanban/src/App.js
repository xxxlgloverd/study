/** @jsxImportSource @emotion/react */
// 上面代码是使用emotion的关键CSS-in-JS
import React, { useEffect, useState } from "react";
import { AddKanbanCard } from "./AddKanbanCard";
import "./App.css";
import KanbanBoard from "./KanbanBoard";
import KanbanCard from "./KanbanCard";
import KanbanColumn from "./KanbanColumn";
const DATE_STORE_KEY = "kanban_data_store";
const COLUMN_KEY_TODO = "todo";
const COLUMN_KEY_ONGONING = "ongoing";
const COLUMN_KEY_DONE = "done";
function App() {
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "2022-05-22 18:15" },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: "进行任务-1", status: "2022-08-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState([
    { title: "完成任务-1", status: "2022-10-22 18:15" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    // todoList.unshift({title,status:new Date().toDateString()});
    setTodoList((current) => [{ title, status: new Date() + " " }, ...current]);
    setShowAdd(false);
  };
  const handleSaveAll = () => {
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList,
    });
    window.localStorage.setItem(DATE_STORE_KEY, data);
  };
  useEffect(() => {
    const data = window.localStorage.getItem(DATE_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const kanbanColumnData = JSON.parse(data);
        setTodoList(kanbanColumnData.todoList);
      }
    }, 1000);
  },[]);//仅在挂载和卸载的时候执行 如果什么都不传就在组件所有更新都执行（即任何时候）
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = (evt) => {
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) { return; }
    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGONING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList
    };
    if (dragSource) {
      updaters[dragSource]((currentStat) => {
        console.log("00",currentStat,"111",draggedItem,currentStat.filter((item) => !Object.is(item, draggedItem)),todoList)
        return currentStat.filter((item) => !Object.is(item, draggedItem));
      });
    }
    if (dragTarget) {
      updaters[dragTarget]((currentStat) => {
        if (currentStat.length > 0) {
          return [draggedItem, ...currentStat]
        } else {
          return [draggedItem]
        }
      })
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          我的看板<button onClick={handleSaveAll}>保存所有卡片</button>{" "}
        </h1>
      </header>
      <KanbanBoard>
        <KanbanColumn
          className="column-todo"
          title={
            <>
              待处理
              <button disabled={showAdd} onClick={handleAdd}>
                &#8853;添加新卡片
              </button>{" "}
            </>
          }
          setIsDragSource={(isSrc) =>
            setDragSource(isSrc ? COLUMN_KEY_TODO : null)
          }
          setIsDragTarget={(isTarget) =>
            setDragTarget(isTarget ? COLUMN_KEY_TODO : null)
          }
          onDrop={handleDrop}
        >
          {/* <h2>
            待处理
            <button disabled={showAdd} onClick={handleAdd}>
              &#8853;添加新卡片
            </button>{" "}
          </h2> */}
          {/* <ul> */}
          {showAdd && <AddKanbanCard onSubmit={handleSubmit} />}
          {todoList && todoList.map((item) => (
            <KanbanCard
              {...item}
              key={item.title}
              onDragStart={() => setDraggedItem(item)}
            />
          ))}
          {/* </ul> */}
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title={"进行中"} setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_ONGONING : null)
        }
          setIsDragTarget={(isTarget) =>
            setDragTarget(isTarget ? COLUMN_KEY_ONGONING : null)
          }
          onDrop={handleDrop}>
          {/* <h2>进行中</h2>
          <ul> */}
          {ongoingList && ongoingList.map((item) => (
            <KanbanCard
              {...item}
              key={item.title}
              onDragStart={() => setDraggedItem(item)}
            />
          ))}
          {/* </ul> */}
        </KanbanColumn>
        <KanbanColumn className="column-done" title={"已处理"} setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_DONE : null)
        }
          setIsDragTarget={(isTarget) =>
            setDragTarget(isTarget ? COLUMN_KEY_DONE : null)
          }
          onDrop={handleDrop}>
          {/* <h2>已处理</h2>
          <ul> */}
          {doneList && doneList.map((item) => (
            <KanbanCard
              {...item}
              key={item.title}
              onDragStart={() => setDraggedItem(item)}
            />
          ))}
          {/* </ul> */}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
