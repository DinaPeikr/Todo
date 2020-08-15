import {CategoryDAO} from '../interfaces/CategoryDAO';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import {TestData} from '../../TestData';

export class CategoryDAOArray implements CategoryDAO {

  add(category: Category): Observable<Category> {

    // если id пустой - генерируем его
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }

    TestData.categories.push(category);

    return of(category);
  }

  // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });
    const categoryTmp = TestData.categories.find(c => c.id === id); // удаляем по id
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1);

    return of(categoryTmp);
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  update(category: Category): Observable<Category> {
    const categoryTmp = TestData.categories.find(c => c.id === category.id); // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1, category);

    return of(categoryTmp);
  }

}
