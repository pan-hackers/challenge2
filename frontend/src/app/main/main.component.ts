import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  shipmentsArray = [];

  constructor(
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    this.getShipments();
  }

  getShipments() {
    console.log(this.shipmentService);
    this.shipmentService.getAllShipments().subscribe(
      (res) => {
        this.shipmentsArray = res;
      }
    );
  }

}
