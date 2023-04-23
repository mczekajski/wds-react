import { FormEvent, useState } from "react";
import "./App.css";

interface IToDo {
  id: string,
  title: string,
  completed: boolean
}

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([] as IToDo[]);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false }
      ]
    })

    setNewItem("");

    console.log(todos)
  }

  function toggleToDo(id: string, completed: boolean) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo;
      })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            type="text" 
            id="item" 
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={e => toggleToDo(todo.id, e.target.checked)}/>
                {todo.title}
              </label>
              <button className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}