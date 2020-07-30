import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'color', 'title', 'category', 'priority', 'date', 'status'];
  tasksData: MatTableDataSource<Task>;
  tasks: Task[];

  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private dataHandlerService: DataHandlerService) {

  }

  ngOnInit(): void {
    // this.tasks = this.dataHandlerService.getTasks();
    this.dataHandlerService.tasksSubject.subscribe(tasks => this.tasks = tasks);
    this.tasksData = new MatTableDataSource();
    this.refreshTable();
    // this.addTableObjects();
  }
  ngAfterViewInit(): void {

     this.addTableObjects();

  }
  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  private refreshTable(): void {
    this.tasksData.data = this.tasks;
    this.addTableObjects();
    this.tasksData.sortingDataAccessor = (task: Task, colName: string): string | number | any => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'id': {
          return task.id;
        }
        case 'title': {
          return task.title;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
      }
    };
  }

  private getPriorityColor(task: Task): string {
    if (task.completed) {
      return '#F8F9FA';
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }

  private addTableObjects(): void {
    this.tasksData.sort = this.sort;
    this.tasksData.paginator = this.paginator;
  }
}
