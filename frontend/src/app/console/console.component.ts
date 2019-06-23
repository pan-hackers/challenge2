import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Block } from '../_shared/block.model';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  public blockChain;
  public block;
  public blockObject = {} as Block;
  public blocksArray = [] as Block[];

  constructor(public readonly store: Store<any>) { }

  ngOnInit() {
    this.store.subscribe((newState) => {
      console.log('STATE UPDATED IN CONSOLE!');
      this.blockChain = newState.RootReducer.shipmentState.blocks;
      console.log('blockchain', this.blockChain);
      if (this.blockChain !== null) {
        this.block = this.blockChain.chain.map(
          (block) => {
            this.blockObject.created = block.createdAt;
            this.blockObject.hash = block.hash;
            this.blockObject.prevHash = block.prevHash;
            this.block = this.blockChain.chain.map(block => JSON.parse(block.data));
            console.log('bloczek', this.block);
            this.blockObject.awb = this.block[0].shipment.awb;
            this.blockObject.sscc = this.block[0].shipment.SSCC;
            this.blockObject.milestone = this.block[0].code;
            this.blocksArray.push(this.blockObject);
            console.log('TEEEEST', block.data[0]);

          }
        );
        console.log('block', this.block);
        console.log('chainArray', this.blocksArray);
      }
    });
  }

}
