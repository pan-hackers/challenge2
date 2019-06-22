import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  public shipment = {};
  public shipmentID = undefined;
  public pup = true;
  public dep = true;
  public arr = true;
  public pod = true;
  public buttonNo = 0;

  constructor(
    private readonly shipmentService: ShipmentService
  ) { }

  ngOnInit() {
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
        this.pup = false;
        this.buttonNo = 1;
      }
    );
  }

  public addMilestone(scanType: string, id: string): void {
    id = this.shipmentID;
    this.shipmentService.createMilestone(scanType, id).subscribe();
    this.buttonStateHandler(scanType);
  }

  public buttonStateHandler(scanType: string): void {
    this.buttonNo++;
    if (this.buttonNo === 2) {
      this.pup = true;
      this.dep = false;
    } else if (this.buttonNo === 3) {
      this.dep = true;
      this.arr = false;
    } else if (this.buttonNo === 4) {
      this.arr = true;
      this.pod = false;
    } else if (this.buttonNo === 5) {
      this.pod = true;
    }
  }
}
