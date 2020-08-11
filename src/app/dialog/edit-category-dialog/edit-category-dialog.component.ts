import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})

// создание/редактирование категории
export class EditCategoryDialogComponent implements OnInit {

   dialogTitle: string;
   categoryTitle: string;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string],
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];

  }
  onConfirm(): void {
    this.dialogRef.close(this.categoryTitle);
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Are you sure to delete this category? (Task do not remove) <br> "${this.categoryTitle}"`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });


  }
}
