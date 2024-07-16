import { Injectable } from '@angular/core';
export interface Todo {
    id: string;
    task: string;
    description: string;
    dueDate: Date | null;
    priority: 'low' | 'medium' | 'high';
    taskstatus:'pending'|'inProgress' |'completed'|null;
    done: boolean;
    editing?: boolean; 
    
}
@Injectable({ providedIn: 'root' })
export class TodoService {

  constructor() {}

    getTodos(): Todo[] {
     return JSON.parse(localStorage.getItem("todos") || '[]');
  }

  saveTodos(todos: Todo[]) {
      localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  updateTodoTask(id: string, updatedTask: string): void {
    let todos = this.getTodos();
    todos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      } else {
        return todo;
      }
    });
    this.saveTodos(todos);
    // return todos;
  }
  updateTodoStatus(id: string, status: 'pending' | 'inProgress' | 'completed' | null): void {
    let todos = this.getTodos();
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, taskstatus: status };
        } else {
            return todo;
        }
    });
    this.saveTodos(todos);
}
}