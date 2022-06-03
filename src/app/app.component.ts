import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ag-grid';
  appPlaygroundUser = {name: 'john', age: 1};

  ngOnInit() {
    setTimeout(() => {
      this.appPlaygroundUser.name = 'doe';
    }, 1000);
  }
}
