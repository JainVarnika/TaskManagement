import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const toggleTaskCompletion = createAction('[Task] Toggle Task Completion', props<{ index: number }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ index: number }>());
