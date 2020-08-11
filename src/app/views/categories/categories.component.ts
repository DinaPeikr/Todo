import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;

  indexMouseMove: number;

  constructor(
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // this.categories = this.dataHandlerService.getAllCategories();
    // this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories );
  }

  showTasksByCategory(category: Category): any {
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
    // this.dataHandlerService.fillTasksByCategory(category);
  }

  showEditIcon(index: number): void {
    this.indexMouseMove = index;

  }

  openEditDialog(category: Category): any {
    console.log(category.title);
    const dialogRef = this.dialog.open(EditCategoryDialogComponent,
      {
        data: [category.title, 'Edit category'],
        autoFocus: false,
        width: 'auto',
        height: 'auto'
      });

    dialogRef.afterClosed().subscribe((result) => {

      // console.log(result);
      if (result === 'delete') {
        console.log(result);
        this.deleteCategory.emit(category);
        return;
      }

      if (result as Task) {
        this.updateCategory.emit(category);
        return;
      }


    });
  }
}
