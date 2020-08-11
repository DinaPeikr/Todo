import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe extends DatePipe implements PipeTransform {

  transform(date: Date, format: string = 'mediumDate'): string {
    if (date == null) {
      return 'No Date';
    }

    date = new Date(date);
    const currentDate = new Date().getDate();

    if (date.getDate() === currentDate) {
      return 'Today';
    }

    if (date.getDate() === currentDate - 1) {
      return 'Yesterday';
    }

    if (date.getDate() === currentDate + 1) {
      return 'Tomorrow';
    }

    return new DatePipe('en-En').transform(date, format);
  }

}
