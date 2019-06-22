import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  public shipment = {};

  constructor(
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
  }

  public getShipment(id: string): void {
    this.shipmentService.getSingleShimpent(id).subscribe(
      res => {
        this.shipment = res;
      }
    );
  }

  public addShipment(): void {
    this.shipmentService.createShipment().subscribe();
  }

  public addMilestone(): void {
    this.shipmentService.createMilestone().subscribe();
  }
}
