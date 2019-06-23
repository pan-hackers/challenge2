import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  constructor(public readonly store: Store<any>) { }

  ngOnInit() {
    this.store.subscribe((newState) => {
      console.log("STATE UPDATED IN CONSOLE!")
    })
  }

}
