import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AboutDialogComponent} from '../../dialog/about-dialog/about-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   year: Date;
   site = 'https://google.com';
   blog = 'https://google.com';
   siteName = 'Test App';
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.year = new Date();
  }
  // окно "О программе"
   openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'About application',
          message: 'This application was created for the video course "Angular for beginners" on the site javabegin.ru'
        },
        width: '400px'
      });

  }
}
