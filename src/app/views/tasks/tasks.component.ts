import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'color', 'title', 'category', 'priority',  'date', 'status'];
  tasksData: MatTableDataSource<Task>;
  tasks: Task[];

  constructor(private dataHandlerService: DataHandlerService) {

  }

  ngOnInit(): void {
    // this.tasks = this.dataHandlerService.getTasks();
    this.dataHandlerService.tasksSubject.subscribe(tasks => this.tasks = tasks);
    this.tasksData = new MatTableDataSource();
    this.refreshTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  private refreshTable(): void {
    this.tasksData.data = this.tasks;
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
}
