import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Todo ,TodoService} from '../services/todo-list.service';
import { AppState } from '../state/app.state';
import { addTodo, loadTodos, moveTodo, removeTodo, editTodo } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  inputField: string = '';
  descriptionField: string = '';
  dueDateField: Date |null= null;
  priorityField: 'low' | 'medium' | 'high' |null = null;
  allTodos$ = this.store.select(selectAllTodos);
  todos: Todo[] = [];
  todoSub: any;

  constructor(private store: Store<AppState>, private TodoService: TodoService) {}


  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.todoSub = this.allTodos$.subscribe(value => this.todos = [...value]);
  }

  addTodo() {
    if (this.inputField === ''|| this.descriptionField === '' || !this.dueDateField || !this.priorityField) {
      alert("Task, Description, Due Date, and Priority are required.");
      return;
    }
    const task = this.inputField;
    const description = this.descriptionField;
    const dueDate = this.dueDateField;
    const priority = this.priorityField;

    this.store.dispatch(addTodo({ task, description, dueDate, priority }));
    this.inputField = '';
    this.descriptionField = '';
    this.dueDateField = null;
    this.priorityField = null;
  }

  removeTodo(id: string) {
    this.store.dispatch(removeTodo({ id: id }));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.store.dispatch(moveTodo({prevIndex: event.previousIndex, newIndex: event.currentIndex}))
  }
  
  editTask(todo: Todo): void {
    const updatedTask = prompt("Edit Todo:", todo.task);
    if (updatedTask !== null) {
      this.store.dispatch(editTodo({ id: todo.id, updatedTask: updatedTask }));
    }
  }
  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }
}
