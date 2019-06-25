import { Component, OnInit } from '@angular/core';

import { ShipmentService } from '../shipment.service';
import { Store } from '@ngrx/store';
import { addShipmet, updateShipments, updateBlocks } from '../_shared/actions'

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
    private readonly store: Store<any>,
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
        if (res !== undefined) {
          this.shipmentService.getAllShipments().subscribe((allShipments) => {
            this.store.dispatch(updateShipments(allShipments));

          });
        }
        this.shipmentID = res;
        console.log(this.shipmentID);
        this.pup = false;
        this.buttonNo = 1;
      }
    );
  }

  public addMilestone(scanType: string, id: string): void {
    id = this.shipmentID;
    this.shipmentService.createMilestone(scanType, id).subscribe((res) => {

      this.shipmentService.getBlockChain().subscribe((blockchain) => {
        console.log("I DISPATCHED BLOCKS")
        this.store.dispatch(updateBlocks(blockchain));
        this.shipmentService.getAllShipments().subscribe((allShimpnets) => {
          console.log("I DISPATCHED SHIPMENTS")
          this.store.dispatch(updateShipments(allShimpnets));
        });
      });
    });
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
