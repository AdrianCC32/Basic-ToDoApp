from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas import Todo, TodoCreate

router = APIRouter()

todos: List[Todo] = []
current_id = 1

@router.get("/todos", response_model=List[Todo])
def get_todos():
    return todos

@router.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    global current_id
    new_todo = Todo(id=current_id, **todo.dict())
    current_id += 1
    todos.append(new_todo)
    return new_todo

@router.put("/todos/{todo_id}/complete", response_model=Todo)
def complete_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todo.completed = True
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@router.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo_data: TodoCreate):
    for idx, todo in enumerate(todos):
        if todo.id == todo_id:
            updated_todo = Todo(id=todo_id, **todo_data.dict())
            todos[idx] = updated_todo
            return updated_todo
    raise HTTPException(status_code=404, detail="Todo not found")

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [todo for todo in todos if todo.id != todo_id]
    return {"message": "Todo deleted"}