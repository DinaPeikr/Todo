import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Category} from '../../model/Category';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'color', 'title', 'category', 'priority', 'date', 'status'];
  tasksData: MatTableDataSource<Task>;

  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  // @Input()
  tasks: Task[];

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  constructor(
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // this.tasks = this.dataHandlerService.getAllTasks();

    this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.tasksData = new MatTableDataSource();
    this.fillTable();
    // this.addTableObjects();
  }

  ngAfterViewInit(): void {

    this.addTableObjects();

  }

  private fillTable(): void {
    if (!this.tasksData) {
      return;
    }
    this.tasksData.data = this.tasks;
    this.addTableObjects();

    // sort table
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

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
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

  // onClickTask(task: Task): any {
  //   // console.log('click on task');
  //   this.updateTask.emit(task);
  // }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent,
      {
        data: [task, 'Edit task'],
        autoFocus: false,
        width: 'auto',
        height: 'auto'
      });

    dialogRef.afterClosed().subscribe((result) => {

      // const result = (res.title) ? `Dialog result: ${res.title}` : `Task title: ${task.title}`;
      // console.log(result);

      if (result === 'complete') {
        console.log(result);
        task.completed = true;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'activate') {
        console.log(result);
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'delete') {
        console.log(result);
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }


    });
  }
}
