import { state } from "@angular/animations";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { identifierName } from "@angular/compiler";
import { discardPeriodicTasks } from "@angular/core/testing";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../services/todo-list.service";
import { addTodo, loadTodos, loadTodosSuccess, moveTodo, removeTodo } from "./todo.actions";


export interface TodoState {
    todos: Todo[];
    error: string | null;
    status: string;
}

export const initialState: TodoState = {
    todos: [],
    error: null,
    status: 'pending'
}

export const todoReducer = createReducer(
    initialState,
    on(addTodo, (state, { task, description, dueDate, priority }) => ({
        ...state,
        todos: [...state.todos, { id: Date.now().toString(), task, description, dueDate, priority, done: false }]
    })),

    on(removeTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
    })),

    on(loadTodos, (state) => ({ ...state, status: "loading" })),
    
    on(loadTodosSuccess, (state, { todos }) => ({
        ...state,
        todos: todos,
        error: null,
        status: "success"
    })),

    on(moveTodo, (state, { prevIndex, newIndex }) => ({
        ...state,
        todos: moveTodoItem([...state.todos], prevIndex, newIndex)
    })),
    
)

function moveTodoItem(todos: Todo[], prevIndex: number, newIndex: number) {
    moveItemInArray(todos, prevIndex, newIndex);
    return todos;
}