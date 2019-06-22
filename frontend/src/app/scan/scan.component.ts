import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  public shipment = {};
  public shipmentID: string;
  public shimpentButtonsArray = { pup: false, dep: false, arr: false, pod: false };

  constructor(
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    console.log(this.shimpentButtonsArray);
  }

  public getShipment(id: string): void {
    this.shipmentService.getSingleShimpent(id).subscribe(
      (res) => {
        this.shipment = res;
      }
    );
  }

  public addShipment(): void {
    this.shipmentService.createShipment().subscribe(
      (res) => {
        this.shipmentID = res;
        console.log(this.shipmentID);
      }
    );
  }

  public addMilestone(scanType: string, id: string): void {
    id = this.shipmentID;
    this.shipmentService.createMilestone(scanType, id).subscribe();
  }
}
