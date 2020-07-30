import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/Category';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    // this.categories = this.dataHandler.getCategories();
    this.dataHandlerService.categoriesSubject.subscribe(categories => this.categories = categories );
  }

  showTasksByCategory(category: Category): any {
    this.selectedCategory = category;
    this.dataHandlerService.fillTasksByCategory(category);
  }
}
