from sqlalchemy import Column, Integer, String
from database import Base

class TodoItem(Base):
    __tablename__ = 'todo_items'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Integer, default=0)  # 0 for not completed, 1 for completed

    def __repr__(self):
        return f"<TodoItem(id={self.id}, title='{self.title}', completed={self.completed})>"