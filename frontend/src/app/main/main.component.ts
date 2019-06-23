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
  constructor(
    private store: Store<any>,
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    console.log(this.store)
    this.getShipments();
    this.subscription = this.store.subscribe((newState) => {
      console.log("STATE UPDATE IN MAIN!")
      console.log(newState)
      this.shipmentsArray=newState.RootReducer.shipmentState.shipments
      console.log(newState.RootReducer.shipmentState.shipmets)
    });
    //this.store.dispatch(updateShipments({text: "uganda"}))
  }

  public onDetailButtonClick = (id) => {
  console.log(id);
  this.viewState = 'details';
  this.shipmentService.getBlockChain().subscribe((blockchain)=>{
    console.log('loaded blockchain',blockchain);
    this.store.dispatch(updateBlocks(blockchain));
  });
  console.log(this.viewState);
}

  public onBackButtonClick = () => {
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
