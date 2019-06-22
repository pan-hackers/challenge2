import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';
import { data } from '../_mock-data/mock-data';
import { Store } from '@ngrx/store';
import { updateShipments } from '../_shared/actions/';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public viewState = 'main';
  public shipmentsArray = [];
  private subscription;
  constructor(
    private store: Store<any>,
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    console.log(this.store)
    this.getShipments();
    this.subscription = this.store.subscribe((newState) => {
      console.log("STATE UPDATE!")
      console.log(newState)
    });
    this.store.dispatch(updateShipments({text: "uganda"}))
  }

  public onDetailButtonClick = (id) => {
  console.log(id);
  this.viewState = 'details';
  console.log(this.viewState);
}

  public onBackButtonClick = () => {
  this.viewState = 'main';
}

  public getShipments() {
  this.shipmentsArray = data;
  /**this.shipmentService.getAllShipments().subscribe(
     (res) => {
       // if (this.shipmentsArray === undefined || this.shipmentsArray.length === 0) {
       //   this.shipmentsArray = data;
       // } else {
       this.shipmentsArray = res;
       console.log(res);
       // }
     }
   ); */
}

}
