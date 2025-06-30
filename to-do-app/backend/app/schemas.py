from pydantic import BaseModel
from typing import Optional
from datetime import date

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    completed: bool = False

class Todo(TodoCreate):
    id: int