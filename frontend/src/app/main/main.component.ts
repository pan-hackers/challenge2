import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public viewState = 'main';
  public shipmentsArray = [];
<<<<<<< Updated upstream
  public shipNum = 'LHR 12312312';
=======
>>>>>>> Stashed changes
  constructor(
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    this.getShipments();
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
