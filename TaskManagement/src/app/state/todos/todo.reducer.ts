import { state } from "@angular/animations";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { identifierName } from "@angular/compiler";
import { discardPeriodicTasks } from "@angular/core/testing";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../services/todo-list.service";
import { addTodo, loadTodos, loadTodosSuccess, moveTodo, removeTodo,editTodo } from "./todo.actions";


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
    on(addTodo, ( state, { task }) => ({
        ...state,
        todos: [...state.todos, { id: Date.now().toString(), task: task, done: false }]
    })),

    on(removeTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
    on(editTodo, (state, { id, updatedTask }) => ({
        ...state,
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, task: updatedTask } : todo
        )
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