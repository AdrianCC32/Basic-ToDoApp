from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas import Todo

router = APIRouter()

todos: List[Todo] = []
current_id = 1

@router.get("/todos", response_model=List[Todo])
def get_todos():
    return todos

@router.post("/todos", response_model=Todo)
def create_todo(todo: Todo):
    global current_id
    todo.id = current_id
    current_id += 1
    todos.append(todo)
    return todo

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [todo for todo in todos if todo.id != todo_id]
    return {"message": "Todo deleted"}