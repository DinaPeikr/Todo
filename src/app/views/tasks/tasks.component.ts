import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {OperType} from '../../dialog/OperType';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'color', 'title', 'category', 'priority', 'date', 'operations', 'status'];
  tasksData: MatTableDataSource<Task>;

  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  // @Input()
  tasks: Task[];
  priorities: Priority[];

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  selectedCategory: Category;

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  addTask = new EventEmitter<Task>();

  // поиск
  searchTaskText: string; // текущее значение для поиска задач
  selectedStatusFilter: boolean = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  selectedPriorityFilter: Priority = null;

  constructor(
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // this.tasks = this.dataHandlerService.getAllTasks();
    console.log(this.selectedCategory);
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

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
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
        data: [task, 'Edit task', OperType.EDIT],
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

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: {dialogTitle: 'Confirm action', message: `Are you sure to delete this task? <br> "${task.title}"`},
        autoFocus: false,
        maxWidth: '500px',
        height: 'auto'
      });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  onShowTasksByCategory(category: Category): any {
    this.selectCategory.emit(category);
    // console.log(category);
  }

  onToggleStatus(task: Task): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  // фильтрация по названию
  onFilterByTitle(): void {
    this.filterByTitle.emit(this.searchTaskText);
  }

  // фильтрация по статусу
  onFilterByStatus(value: boolean): void {
    // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

// фильтрация по priority
  onFilterByPriority(value: Priority): any {
    console.log(value);
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  openAddTaskDialog(): void {
    console.log(this.selectedCategory);
    // то же самое, что и при редактировании, но только передаем пустой объект Task
    const task = new Task(null, '', false, null, this.selectedCategory);
    console.log(this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Add task', OperType.ADD]});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) { // если нажали ОК и есть результат
        this.addTask.emit(task);
      }
    });

  }
}
