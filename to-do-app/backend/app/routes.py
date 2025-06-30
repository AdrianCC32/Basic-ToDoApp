from fastapi import APIRouter, HTTPException
from app.schemas import TodoCreate, TodoUpdate, Todo
from app.models import TodoModel

router = APIRouter()

@router.post("/todos/", response_model=Todo)
async def create_todo(todo: TodoCreate):
    new_todo = TodoModel(**todo.dict())
    new_todo.save()  # Assuming a save method exists
    return new_todo

@router.get("/todos/", response_model=list[Todo]):
async def read_todos():
    return TodoModel.query.all()  # Assuming a query method exists

@router.get("/todos/{todo_id}", response_model=Todo)
async def read_todo(todo_id: int):
    todo = TodoModel.query.get(todo_id)  # Assuming a query method exists
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo: TodoUpdate):
    existing_todo = TodoModel.query.get(todo_id)  # Assuming a query method exists
    if existing_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    for key, value in todo.dict().items():
        setattr(existing_todo, key, value)
    existing_todo.save()  # Assuming a save method exists
    return existing_todo

@router.delete("/todos/{todo_id}", response_model=dict)
async def delete_todo(todo_id: int):
    todo = TodoModel.query.get(todo_id)  # Assuming a query method exists
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.delete()  # Assuming a delete method exists
    return {"message": "Todo deleted successfully"}