import "./App.css";
import React, { useState } from "react";

const ongoingList = [{ title: "进行任务", status: "2022年11月9日 15点29分" }];
const doneList = [{ title: "完成任务", status: "2022年11月9日 15点39分" }];
const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};
const AddKanbanCard = ({onSubmit}) => {
  const [title,setTitle]=useState('')
  const handleChange=(evt)=>{
     setTitle(evt.target.value)
  }
  const handleKeyDown=(evt)=>{
    console.log(evt.key)
    if(evt.key =='Enter')
    onSubmit(title)
  }
  return (
    <li className="kanban-card">
      <h4>添加新卡片</h4>
      <div className="card-title">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown}></input>
      </div>
    </li>
  );
};
function App() {
  const [todoList, setTodoList] = useState([ { title: '开发任务-1', status: '22-05-22 18:15' }]);
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit=(title)=>{
    // todoList.unshift({title,status:new Date().toDateString()});
    setTodoList(current=>[{title,status:new Date().toDateString()},...current])
    setShowAdd(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>
            待处理
            <button disabled={showAdd} onClick={handleAdd}>
              &#8853;添加新卡片
            </button>{" "}
          </h2>
          <ul>
            {showAdd && <AddKanbanCard onSubmit={handleSubmit} />}
            {todoList.map((item) => (
              <KanbanCard {...item} key={item.title} />
            ))}
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
          <ul>
            {ongoingList.map((item) => (
              <KanbanCard {...item} key={item.title} />
            ))}
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已处理</h2>
          <ul>
            {doneList.map((item) => (
              <KanbanCard {...item} key={item.title} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
