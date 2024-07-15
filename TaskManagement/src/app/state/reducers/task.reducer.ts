import { createReducer, on } from '@ngrx/store';
import { addTask, toggleTaskCompletion, deleteTask } from '../actions/task.actions';
import { Task } from '../../models/task.model';

export const initialState: Task[] = [];

const _taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [...state, task]),
  on(toggleTaskCompletion, (state, { index }) => {
    const updatedTask = { ...state[index], completed: !state[index].completed };
    return state.map((task, i) => i === index ? updatedTask : task);
  }),
  on(deleteTask, (state, { index }) => state.filter((_, i) => i !== index))
);

export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
