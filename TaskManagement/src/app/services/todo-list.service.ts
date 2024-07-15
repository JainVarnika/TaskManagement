import { Injectable } from '@angular/core';
export interface Todo {
    id: string;
    task: string;
    done: boolean;
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
}