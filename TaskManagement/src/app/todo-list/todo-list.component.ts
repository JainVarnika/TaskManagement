import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChangeDetectorRef } from '@angular/core';

import { Observable, Subscriber, Subscription } from 'rxjs';
import { Todo ,TodoService} from '../services/todo-list.service';
import { AppState } from '../state/app.state';
import { addTodo, loadTodos, moveTodo, removeTodo, editTodo } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';
import { Papa } from 'ngx-papaparse';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],

})
export class TodoListComponent implements OnInit, OnDestroy {
  inputField: string = '';
  descriptionField: string = '';
  dueDateField: Date |null= null;
  priorityField: 'low' | 'medium' | 'high' |null = null;
  taskstatusField:'pending'|'inProgress' |'completed' | null=null; 
  allTodos$ = this.store.select(selectAllTodos);
  todos: Todo[] = [];
  todoSub:Subscription | undefined;

  constructor(private store: Store<AppState>, private TodoService: TodoService , private papa: Papa,private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.todoSub = this.allTodos$.subscribe(value => {this.todos = [...value];
    console.log(this.allTodos$);
    this.cdr.markForCheck(); 
  });
  }

  addTodo() {
    if (this.inputField === ''|| this.descriptionField === ''  || !this.priorityField ) {
      alert("Task, Description, Due Date, and Priority are required.");
      return;
    }
    const task = this.inputField;
    const description = this.descriptionField;
    // const dueDate = this.dueDateField ? this.dueDateField.toISOString() : '';
    // const dueDate = this.dueDateField; 
    const dueDate = this.dueDateField ? new Date(this.dueDateField) : null;
    const priority = this.priorityField;
    const taskstatus='pending';

    this.store.dispatch(addTodo({ task, description, dueDate, priority ,taskstatus}));
    this.inputField = '';
    this.descriptionField = '';
    this.dueDateField = null;
    this.priorityField = 'low';
    this.taskstatusField='pending';
  }

  updateTaskStatus(id: string, status: 'pending' | 'inProgress' | 'completed' | null) {
    this.TodoService.updateTodoStatus(id, status);
    this.todos = this.TodoService.getTodos();
  }

  removeTodo(id: string) {
    this.store.dispatch(removeTodo({ id: id }));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.store.dispatch(moveTodo({prevIndex: event.previousIndex, newIndex: event.currentIndex}))
  }
  
 
  editTask(todo: Todo): void {
    const updatedTask = prompt("Edit Todo:", todo.task);
    if (updatedTask !== null) {
      this.store.dispatch(editTodo({ id: todo.id, updatedTask }));
    }
  }

  
  exportToCSV(): void {
    const todos = this.todos.map(todo => ({
      id: todo.id,
      task: todo.task,
      description: todo.description,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString() : '', // Handle null or undefined dueDate
      priority: todo.priority,
      done: todo.done.toString() // Convert boolean to string
    }));
  
    const csv = this.papa.unparse({
      fields: ['ID', 'Task', 'Description', 'Due Date', 'Priority', 'Done'],
      data: todos.map(todo => [
        todo.id,
        todo.task,
        todo.description,
        todo.dueDate,
        todo.priority
      ])
    });
  
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }


  
  sortTodosByDueDate() {
    this.todos.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  
    // Reassign the sorted array back to trigger change detection
    this.todos = [...this.todos];
  
    console.log('After sorting:', this.todos);
  }
  
  // sortTodosByPriority() {
  //   this.todos.sort((a, b) => {
  //     // Convert priority to a numerical value for sorting: low = 0, medium = 1, high = 2
  //     const priorityOrder = { low: 0, medium: 1, high: 2 };
  //     return priorityOrder[a.priority] - priorityOrder[b.priority];
  //   });
  //   this.todos = [...this.todos];
  //   console.log('After sorting:', this.todos);
  // }
  sortTodosByPriority() {
    // Define the priority order
    const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
  
    // Sort todos array based on priority order
    this.todos.sort((a, b) => {
      const priorityA = priorityOrder[a.priority];
      const priorityB = priorityOrder[b.priority];
  
      // Compare priorities
      if (priorityA < priorityB) {
        return -1;
      }
      if (priorityA > priorityB) {
        return 1;
      }
      // If priorities are equal, maintain existing order
      return 0;
    });
  
    // Log the sorted todos to verify sorting
    console.log('Sorted Todos:', this.todos);
  }
  
  ngOnDestroy(): void {
    // this.todoSub.unsubscribe();
  }
}
