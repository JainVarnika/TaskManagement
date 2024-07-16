import { createAction, props } from "@ngrx/store";
import { Todo } from "../../services/todo-list.service";

export const addTodo = createAction(
    "[Todo Page] Add Todo",
    props<{ task: string ;description: string; dueDate: Date|null; priority: 'low' | 'medium' | 'high';  taskstatus:'pending'|'inProgress' |'completed'|null}>()
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
export const editTodo = createAction(
    "[Todo Page] Edit Todo",
    props<{ id: string, updatedTask: string }>()
);