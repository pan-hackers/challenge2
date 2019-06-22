import { Component, OnInit } from '@angular/core';

import { data } from '../_mock-data/mock-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public gridData: any[] = data;

  constructor() { }

  ngOnInit() {
  }

}
