import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {addTodo,removeTodo,loadTodos,loadTodosSuccess,moveTodo,} from './todo.actions';
import { TodoService } from '../../services/todo-list.service';
import { of, from } from 'rxjs';
import {map,withLatestFrom,tap,} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllTodos } from './todo.selectors';
import { AppState } from '../app.state';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      map(() => {
        const todos = this.todoService.getTodos();
        return loadTodosSuccess({ todos: todos });
      })
    )
  );

  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTodo, removeTodo, moveTodo),
        withLatestFrom(this.store.select(selectAllTodos)),
        tap(([action, todos]) => this.todoService.saveTodos(todos))
      ),
    { dispatch: false }
  );
}
