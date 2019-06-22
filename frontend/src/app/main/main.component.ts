import { Component, OnInit } from '@angular/core';

import { data } from '../_mock-data/mock-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public viewState = "main";

  public gridData: any[] = data;
  public onDetailButtonClick = (id) => {
    console.log(id);
    this.viewState="details";
    console.log(this.viewState);
  }
  public onBackButtonClick= ()=>{
    
  }
  constructor() { }

  ngOnInit() {
  }

}
