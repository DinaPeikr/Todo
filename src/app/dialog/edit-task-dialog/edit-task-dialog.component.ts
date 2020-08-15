import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from '../OperType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {
  categories: Category[];
  priorities: Priority[];

  dialogTitle: string;
  task: Task;
  operType: OperType;
  tmpTitle: string;
  tmpCategory: Category;
  tmpPriority: Priority;
  tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: [Task, string, OperType],
    private dataHandlerServer: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    this.operType = this.data[2];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    // console.log(this.task);
    // console.log(this.dialogTitle);
    this.dataHandlerServer.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandlerServer.getAllPriorities().subscribe(items => this.priorities = items);
    // console.log(this.priorities);
  }

  onConfirm(): void {

    // считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);

  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: {dialogTitle: 'Confirm action',
        message: `Are you sure to delete this task? <br> "${this.task.title}"`},
        autoFocus: false,
        maxWidth: '500px',
        height: 'auto'
      });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  complete(): void {
    this.dialogRef.close('complete');
  }

  activate(): void {
    this.dialogRef.close('activate');
  }

   canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

   canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}
