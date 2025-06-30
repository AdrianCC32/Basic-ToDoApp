import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: ''
  });

  useEffect(() => {
    fetch('http://localhost:8000/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = async (todo) => {
    const res = await fetch(`http://localhost:8000/todos/${todo.id}/complete`, { method: 'PUT' });
    if (res.ok) {
      setTodos(todos.map(t =>
        t.id === todo.id ? { ...t, completed: !todo.completed } : t
      ));
    }
  };

  const handleAddOrEdit = async (e) => {
  e.preventDefault();
  if (!form.title.trim()) return;

  if (isEditing) {
    // Editar tarea existente
    const res = await fetch(`http://localhost:8000/todos/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updatedTodo = await res.json();
      setTodos(todos.map(todo => todo.id === editId ? updatedTodo : todo));
    }
  } else {
    // Agregar nueva tarea
    const newTodo = {
      title: form.title,
      description: form.description,
      due_date: form.due_date || null,
      completed: false
    };
    const res = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (res.ok) {
      const todoFromBackend = await res.json();
      setTodos([...todos, todoFromBackend]);
    }
  }
  setForm({ title: '', description: '', due_date: '' });
  setShowForm(false);
  setIsEditing(false);
  setEditId(null);
};

  const handleComplete = async (id) => {
    const res = await fetch(`http://localhost:8000/todos/${id}/complete`, { method: 'PUT' });
    if (res.ok) {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: true } : todo));
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <button className="add-btn" onClick={() => setShowForm(true)}>Agregar</button>
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <form onSubmit={handleAddOrEdit}>
              <h2>Agregar tarea</h2>
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Título"
                required
              />
              <input
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Descripción"
              />
              <input
                name="due_date"
                type="date"
                value={form.due_date}
                onChange={handleInputChange}
                placeholder="Fecha límite"
              />
              <div className="modal-actions">
                <button type="submit">{isEditing ? 'Guardar cambios' : 'Guardar'}</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.completed ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>{todo.title}</strong><br />
              <span>{todo.description}</span><br />
              <small>Fecha límite: {todo.due_date || 'Sin fecha'}</small>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {!todo.completed && (
                <button onClick={() => handleToggleComplete(todo)}>
                  Completar
                </button>
              )}
              {todo.completed && (
                <button onClick={() => handleToggleComplete(todo)}>
                  Marcar como incompleta
                </button>
              )}
              <button onClick={() => {
                setIsEditing(true);
                setEditId(todo.id);
                setForm({
                  title: todo.title,
                  description: todo.description,
                  due_date: todo.due_date || ''
                });
                setShowForm(true);
              }}>
                Editar
              </button>
              <button onClick={() => handleDelete(todo.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;