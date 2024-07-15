// todolist.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import { Task } from '../models/task.model';
import { addTask, toggleTaskCompletion, deleteTask } from '../state/actions/task.actions';
import { selectAllTasks } from '../state/selectors/task.selectors';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  standalone: true,
  styleUrls: ['./todolist.component.css'],
  imports: [ReactiveFormsModule, CommonModule] 
})
export class TodolistComponent {
  todoForm: FormGroup;
  tasks: {  title: string,
    description: string,
    dueDate: Date
    completed: boolean }[] = [];

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  addTask(): void {
    if (this.todoForm.valid) {
      this.tasks.push({title: this.todoForm.value.title,
        description: this.todoForm.value.description,
        dueDate: new Date(this.todoForm.value.dueDate), completed: false });
      this.todoForm.reset();
    }
  }

  toggleTaskCompletion(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
