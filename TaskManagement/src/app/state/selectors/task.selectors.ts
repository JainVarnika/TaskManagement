import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const selectTasks = createFeatureSelector<Task[]>('tasks');

export const selectAllTasks = createSelector(selectTasks, (tasks: Task[]) => tasks);
