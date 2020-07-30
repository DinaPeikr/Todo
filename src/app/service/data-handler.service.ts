import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import {Task} from '../model/Task';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
    this.fillTasks();
    this.fillCategories();
  }

  getCategories(): Category[] {
    return TestData.categories;
  }

  fillCategories(): void {
    this.categoriesSubject.next(TestData.categories);
  }

  getTasks(): Task[] {
    return TestData.tasks;
  }

  fillTasks(): void {
    this.tasksSubject.next(TestData.tasks);
  }


  fillTasksByCategory(category: Category): void {
    const tasks = TestData.tasks.filter((task) => task.category === category);
    // console.log(tasks);
    this.tasksSubject.next(tasks);
  }
}
