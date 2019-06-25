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

  constructor(public readonly store: Store<any>) { }

  ngOnInit() {
    this.store.subscribe((newState) => {
      console.log('STATE UPDATED IN CONSOLE!');
      const blockChain = newState.RootReducer.shipmentState.blocks;
      console.log('blockchain', blockChain);
      if (blockChain !== null) {
        blockChain.chain.map(
          (block) => {
            const blockObject = {} as Block;
            blockObject.created = block.createdAt;
            blockObject.hash = block.hash;
            blockObject.prevHash = block.prevHash;
            const events = JSON.parse(block.data);
            blockObject.milestone = events.code;
            blockObject.awb = events.shipment.awb;
            blockObject.sscc = events.shipment.SSCC;
            this.blocksArray.unshift(blockObject);
          }
        );
        console.log('chainArray', this.blocksArray);
      }
    });
  }

}
