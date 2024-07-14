// todolist.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  standalone: true,
  styleUrls: ['./todolist.component.css'],
  imports: [ReactiveFormsModule, CommonModule] 
})
export class TodolistComponent {
  todoForm: FormGroup;
  tasks: { name: string, completed: boolean }[] = [];

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required]
    });
  }

  addTask(): void {
    if (this.todoForm.valid) {
      this.tasks.push({ name: this.todoForm.value.taskName, completed: false });
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
