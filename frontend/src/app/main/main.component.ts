import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';
import { data } from '../_mock-data/mock-data';
import { Store } from '@ngrx/store';
import { updateShipments, updateBlocks } from '../_shared/actions/';

// import { data } from '../_mock-data/mock-data';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public viewState = 'main';
  public shipmentsArray = [];
  private subscription;
  public selectedShipment: number;
  public state;
  constructor(
    private store: Store<any>,
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    console.log(this.store)
    this.getShipments();
    this.subscription = this.store.subscribe((newState) => {
      console.log("old state", this.state)
      console.log("STATE UPDATE IN MAIN!")
      this.state = newState;
      this.shipmentsArray = newState.RootReducer.shipmentState.shipments
      console.log(newState.RootReducer.shipmentState.shipmets)
      console.log(this.shipmentsArray)
    });
    //this.store.dispatch(updateShipments({text: "uganda"}))
  }

  public onDetailButtonClick = (id) => {
    this.selectedShipment = id;
    this.viewState = 'details';
    this.shipmentService.getBlockChain().subscribe((blockchain) => {
      this.store.dispatch(updateBlocks(blockchain));
    });
  }

  public onBackButtonClick = () => {
    this.selectedShipment = undefined
    this.viewState = 'main';
  }

  public getShipments() {
    // this.shipmentsArray = data;
    this.shipmentService.getAllShipments().subscribe(
      (res) => {
        this.store.dispatch(updateShipments(res));
        // if (this.shipmentsArray === undefined || this.shipmentsArray.length === 0) {
        //   this.shipmentsArray = data;
        // } else {
        console.log(res);
        // }
      }
    );
  }

}
