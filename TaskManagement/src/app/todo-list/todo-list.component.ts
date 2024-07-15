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
  allTodos$ = this.store.select(selectAllTodos);
  todos: Todo[] = [];
  todoSub: any;

  constructor(private store: Store<AppState>, private TodoService: TodoService) {}


  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.todoSub = this.allTodos$.subscribe(value => this.todos = [...value]);
  }

  addTodo() {
    if (this.inputField === '') {
      return;
    }

    this.store.dispatch(addTodo({ task: this.inputField }));
    this.inputField = '';
  }

  removeTodo(id: string) {
    this.store.dispatch(removeTodo({ id: id }));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.store.dispatch(moveTodo({prevIndex: event.previousIndex, newIndex: event.currentIndex}))
  }
  // editTask(id: string, updatedTask: string) {
  //   this.store.dispatch(editTodo({ id, updatedTask }));
  // }
  // editTask(todo: Todo): void {
  //   const updatedTask = prompt("Edit Todo:", todo.task);
  //   if (updatedTask !== null) {
  //     this.updateTodoTask(todo.id, updatedTask);
  //   }
  // }
  // updateTodoTask(id: string, updatedTask: string): void {
  //   this.todos = this.TodoService.updateTodoTask(id, updatedTask);
  // }
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
