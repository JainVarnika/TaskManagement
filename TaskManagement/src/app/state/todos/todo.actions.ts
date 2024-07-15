import { createAction, props } from "@ngrx/store";
import { Todo } from "../../services/todo-list.service";

export const addTodo = createAction(
    "[Todo Page] Add Todo",
    props<{ task: string }>()
);

export const removeTodo = createAction(
    "[Todo Page] Remove Todo",
    props<{ id: string }>()
);

export const loadTodos = createAction(
    "[Todo Page] Load Todos"
);

export const loadTodosSuccess = createAction(
    "[Todo API] Todo Load Success",
    props<{ todos: Todo[] }>()
);

export const moveTodo = createAction(
    "[Todo Page] Move Todo",
    props<{ prevIndex: number, newIndex: number }>()
);