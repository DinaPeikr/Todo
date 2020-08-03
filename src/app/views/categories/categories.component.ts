import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '../../model/Category';
import {DataHandlerService} from '../../service/data-handler.service';

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
  selectedCategory: Category;

  constructor(private dataHandlerService: DataHandlerService) {
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
}
