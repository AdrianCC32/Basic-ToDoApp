import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('/api/todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = () => {
        if (newTodo.trim()) {
            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: newTodo }),
            })
            .then(response => response.json())
            .then(data => {
                setTodos([...todos, data]);
                setNewTodo('');
            });
        }
    };

    const deleteTodo = (id) => {
        fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
};

export default App;