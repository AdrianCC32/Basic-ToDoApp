from pydantic import BaseModel
from typing import List, Optional

class TodoItem(BaseModel):
    id: int
    title: str
    completed: bool

class TodoCreate(BaseModel):
    title: str

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

class TodoListResponse(BaseModel):
    items: List[TodoItem]