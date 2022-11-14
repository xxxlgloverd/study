/** @jsxImportSource @emotion/react */
// 上面代码是使用emotion的关键CSS-in-JS
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import "./App.css";
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;
const ongoingList = [{ title: "进行任务", status: "2022-11-09 15:29" }];
const doneList = [{ title: "完成任务", status: "2022-11-09 15:59" }];
const KanbanBoard = ({ children }) => (
  <main
    css={css`
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin: 0 1rem 1rem;
    `}
  >
    {children}
  </main>
);
const KanbanColumn = ({
  children,
  className,
  title,
  setIsDragSource = () => { },
  setIsDragTarget = () => { },
  onDrop,
}) => {
  const combinedClassName = `kanban-column ${className}`;
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
        console.log("============323")
        evt.preventDefault();
        onDrop && onDrop(evt);
      }}
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};
const KanbanCard = ({ title, status, onDragStart }) => {
  const [displayTime, setDisplayTime] = useState(status);
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = "刚刚";
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      } else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }

      setDisplayTime(relativeTime);
    };
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [status]);
  const handleDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("text/plain", title);
    onDragStart && onDragStart(evt);
  };
  return (
    <li className="kanban-card" draggable onDragStart={handleDragStart}>
      <div className="card-title">{title}</div>
      <div className="card-status">{displayTime}</div>
    </li>
  );
};
const AddKanbanCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") onSubmit(title);
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
  });
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = (evt) => {
    console.log("6666",draggedItem,dragSource,dragTarget)
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) { return; }
    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGONING]:setOngoingList,
      [COLUMN_KEY_DONE]:setDoneList
    };
    if (dragSource) {
      updaters[dragSource]((currentStat) => {
        console.log('11',currentStat)
     return   currentStat.filter((item) => !Object.is(item, draggedItem));
      });
    }
    if (dragTarget) {
      updaters[dragTarget]((currentStat) =>{
        console.log('22',currentStat)
        if(currentStat.length>0){
          return  [draggedItem, ...currentStat]
        }else{
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
          {todoList&&todoList.map((item) => (
            <KanbanCard
              {...item}
              key={item.title}
              onDragStart={() => setDraggedItem(item)}
            />
          ))}
          {/* </ul> */}
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title={"进行中"}   setIsDragSource={(isSrc) =>
            setDragSource(isSrc ? COLUMN_KEY_ONGONING : null)
          }
          setIsDragTarget={(isTarget) =>
            setDragTarget(isTarget ? COLUMN_KEY_ONGONING : null)
          }
          onDrop={handleDrop}>
          {/* <h2>进行中</h2>
          <ul> */}
          {ongoingList&&ongoingList.map((item) => (
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
          {doneList&&doneList.map((item) => (
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
