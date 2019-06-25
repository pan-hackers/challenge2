import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { updateBlocks, updateShipments, changeLeftPanel } from '../_shared/actions/';
import { ShipmentService } from '../shipment.service';

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
    this.getShipments();
    this.subscription = this.store.subscribe((newState) => {
      this.state = newState;
      console.log("newState: ", newState);
      this.shipmentsArray = this.state.RootReducer.shipmentState.shipments;
      this.viewState = this.state.RootReducer.navigationState.left;
    });
    //this.store.dispatch(updateShipments({text: "uganda"}))
  }

  public onDetailButtonClick = (id) => {
    this.selectedShipment = id;
    this.store.dispatch(changeLeftPanel('details'));
    this.shipmentService.getBlockChain().subscribe((blockchain) => {
      this.store.dispatch(updateBlocks(blockchain));
    });
  }

  public getShipments() {
    // this.shipmentsArray = data;
    this.shipmentService.getAllShipments().subscribe(
      (res) => {
        this.store.dispatch(updateShipments(res));
        // if (this.shipmentsArray === undefined || this.shipmentsArray.length === 0) {
        //   this.shipmentsArray = data;
        // } else {
        // }
      }
    );
  }

}
