import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Block } from '../_shared/block.model';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  public blocksArray = [] as Block[];
  public updateCount = 0;

  constructor(public readonly store: Store<any>) { }

  ngOnInit() {
    this.store.subscribe((newState) => {
      this.updateCount++;
      const blocks = [] as Block[];
      console.log('STATE UPDATED IN CONSOLE! ' + this.updateCount);
      const blockChain = newState.RootReducer.shipmentState.blocks;
      console.log('blockchain', blockChain);
      if (blockChain !== null) {
        blockChain.chain.map(
          (block) => {
            const blockObject = {} as Block;
            const events = JSON.parse(block.data);
            blockObject.created = block.createdAt;
            blockObject.hash = block.hash;
            blockObject.prevHash = block.prevHash;
            blockObject.milestone = events.code;
            blockObject.awb = events.shipment.awb;
            blockObject.sscc = events.shipment.SSCC;
            blocks.unshift(blockObject);
          }
        );
        console.log('chainArray', this.blocksArray);
      }
      this.blocksArray = blocks;
    });
  }

}
