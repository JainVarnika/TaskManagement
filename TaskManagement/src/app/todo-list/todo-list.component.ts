import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Todo } from '../services/todo-list.service';
import { AppState } from '../state/app.state';
import { addTodo, loadTodos, moveTodo, removeTodo } from '../state/todos/todo.actions';
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

  constructor(private store: Store<AppState>) {}


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

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }
}
