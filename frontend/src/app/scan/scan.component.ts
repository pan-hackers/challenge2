import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  shipment = {};

  constructor(
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
  }

  getShipment(id: string) {
    this.shipmentService.getSingleShimpent(id).subscribe(
      res => {
        this.shipment = res;
      }
    );
  }

  addShipment() {
    this.shipmentService.createShipment().subscribe();
  }

  addMilestone() {
    this.shipmentService.createMilestone().subscribe();
  }
}
