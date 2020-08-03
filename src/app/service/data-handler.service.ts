import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import {Task} from '../model/Task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TaskDAOArray} from '../data/dao/implementations/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/implementations/CategoryDAOArray';
import {Priority} from '../model/Priority';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);
  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();

  constructor() {
    this.fillTasks();
    this.fillCategories();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  fillCategories(): void {
    this.categoriesSubject.next(TestData.categories);
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  fillTasks(): void {
    this.tasksSubject.next(TestData.tasks);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  // fillTasksByCategory(category: Category): void {
  //   const tasks = TestData.tasks.filter((task) => task.category === category);
  //   // console.log(tasks);
  //   this.tasksSubject.next(tasks);
  // }

  getTasksByCategory(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
}
