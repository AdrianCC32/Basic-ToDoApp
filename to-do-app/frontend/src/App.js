import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Obtener todos al cargar
  useEffect(() => {
    fetch('http://localhost:8000/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Agregar nuevo todo
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo = { id: Date.now(), title: input, completed: false };
    const res = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (res.ok) {
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  // Eliminar todo
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleAdd}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;