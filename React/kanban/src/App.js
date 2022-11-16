/** @jsxImportSource @emotion/react */
// 上面代码是使用emotion的关键CSS-in-JS
import React, { useEffect, useState } from "react";
import AdminContext from "./context/AdminContext";
import "./App.css";
import KanbanBoard, {
  COLUMN_KEY_DONE,
  COLUMN_KEY_ONGONING,
  COLUMN_KEY_TODO,
} from "./KanbanBoard";
const DATE_STORE_KEY = "kanban_data_store";

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
  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGONING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList,
  };
  const handleAdd = (column, newCard) => {
    updaters[column]((currentList) => [newCard, ...currentList]);
  };
  const handleRemove = (column, cardToRemove) => {
    updaters[column]((currentList) =>
      currentList.filter((item) => item.title !== cardToRemove.title)
    );
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const handleToggleAdmin = (evt) => {
    setIsAdmin(!isAdmin);
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
  }, []); //仅在挂载和卸载的时候执行 如果什么都不传就在组件所有更新都执行（即任何时候）
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          我的看板<button onClick={handleSaveAll}>保存所有卡片</button>{" "}
          <label>
            <input
              type="checkbox"
              value={isAdmin}
              onChange={handleToggleAdmin}
            ></input>
            管理员模式
          </label>
        </h1>
      </header>
      <AdminContext.Provider value={isAdmin}>
        <KanbanBoard
          todoList={todoList}
          ongoingList={ongoingList}
          doneList={doneList}
          onAdd={handleAdd}
          onRemove={handleRemove}
        ></KanbanBoard>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
