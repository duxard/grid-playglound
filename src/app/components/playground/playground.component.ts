import { Component, OnInit } from '@angular/core';
import { map, take, interval, Observable, Subscription } from 'rxjs';

type User = {user: string, age: number}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  data: Array<User> = [
    {user: 'Alex', age: 10},
    {user: 'John', age: 20}
  ];

  obs$!: Observable<number>;
  sub$!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.getData().pipe(take(5)).subscribe((data) => {
      console.log(data);
    });

  }

  private getData():Observable<Array<User>> {
    this.obs$ = interval(1000);

    return this.obs$.pipe(map(() => {
      return this.data.map((val, id, arr) => (
        {
          user: val.user,
          age: getRandomNumber()
        }
      ));
    }));
  }
}

const getRandomNumber = (): number => Math.floor(1 + Math.random()*100);
