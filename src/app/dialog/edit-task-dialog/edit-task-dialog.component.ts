import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {
  dialogTitle: string;
  private task: Task;
  tmpTitle: string;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: [Task, string],
    private dataHandlerServer: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    this.tmpTitle = this.task.title;
    // console.log(this.task);
    // console.log(this.dialogTitle);

  }
  onConfirm(): void {

    // считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle;


    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.task);

  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
   onCancel(): void {
    this.dialogRef.close(null);
  }

}
