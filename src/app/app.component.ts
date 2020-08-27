import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  tasks: Task[];
  priorities: Priority[];
  categories: Category[];
  date = new Date().getFullYear();
  selectedCategory: Category = null;
  // поиск
  searchTaskText = ''; // текущее значение для поиска задач
  searchCategoryText = '';

  // фильтрация
  statusFilter: boolean;
  priorityFilter: Priority;

  // статистика
  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;

  // показать/скрыть статистику
  showStat = true;

  constructor(private dataHandlerService: DataHandlerService) {

  }

  ngOnInit(): void {
    // this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    // this.onSelectCategory(null); // показать все задачи
    this.updateTasksAndStat();
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    // this.updateTasks();
    this.updateTasksAndStat();
    // this.dataHandlerService.getTasksByParams(
    //   this.selectedCategory,
    //   null,
    //   null,
    //   null,
    // ).subscribe((tasks) => {
    //   this.tasks = tasks;
    // });
  }

  onDeleteCategory(category: Category): any {
    this.dataHandlerService.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категорию "Все"
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onUpdateCategory(category: Category): any {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onUpdateTask(task: Task): any {
    // console.log(task);
    this.dataHandlerService.updateTask(task).subscribe(() => {
      // this.updateTasks();
      this.updateTasksAndStat();
      // this.dataHandlerService.getTasksByParams(
      //   this.selectedCategory,
      //   null,
      //   null,
      //   null
      // ).subscribe(tasks => {
      //   this.tasks = tasks;
      // });
    });
  }

  onDeleteTask(task: Task): any {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      //  this.updateTasks();
      this.updateTasksAndStat();
      //   this.dataHandlerService.getTasksByParams(
      //     this.selectedCategory,
      //     null,
      //     null,
      //     null
      //   ).subscribe(tasks => {
      //     this.tasks = tasks;
      //   });
    });
  }


  // поиск задач
  onSearchTasks(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фильтрация задач по статусу (все, решенные, нерешенные)
  onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  // фильтрация задач по priority ()
  onFilterTasksByPriority(priority: Priority): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  updateTasks(): void {
    this.dataHandlerService.getTasksByParams(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter,
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // добавление задачи
  onAddTask(task: Task): void {

    this.dataHandlerService.addTask(task).subscribe(result => {

      // this.updateTasks();
      this.updateTasksAndStat();
    });

  }

  // добавление категории
  onAddCategory(title: any): void {
    this.dataHandlerService.addCategory(title).subscribe(() => this.updateCategories());
  }

  updateCategories(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  // поиск категории
  onSearchCategory(title: string): void {

    this.searchCategoryText = title;

    this.dataHandlerService.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  updateTasksAndStat(): void {

    this.updateTasks(); // обновить список задач

    // обновить переменные для статистики
    this.updateStat();

  }

  // обновить статистику
  updateStat(): any {
    const totalTasksCountInCategory = this.dataHandlerService.getTotalCountInCategory(this.selectedCategory);
    const completedCountInCategory = this.dataHandlerService.getCompletedCountInCategory(this.selectedCategory);
    const uncompletedCountInCategory = this.dataHandlerService.getUncompletedCountInCategory(this.selectedCategory);
    const uncompletedTotalTasksCount = this.dataHandlerService.getUncompletedTotalCount();
    zip(
      totalTasksCountInCategory,
      completedCountInCategory,
      uncompletedCountInCategory,
      uncompletedTotalTasksCount)
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
      });
  }

  // показать-скрыть статистику
  toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }
}
