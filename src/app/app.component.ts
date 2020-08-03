import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  tasks: Task[];
  categories: Category[];
  date = new Date().getFullYear();
  private selectedCategory: Category = null;

  constructor(private dataHandlerService: DataHandlerService) {

  }

  ngOnInit(): void {
    this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);

  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.dataHandlerService.getTasksByCategory(
      this.selectedCategory,
      null,
      null,
      null,
    ).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onUpdateTask(task: Task): any {
    console.log(task);
  }
}
