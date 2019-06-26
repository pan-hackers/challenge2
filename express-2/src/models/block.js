import sha1 from 'sha1';
import mongoose from 'mongoose';
import helpers from '../helpers';

import boom from '@hapi/boom';
import Milestone from './milestone';

const blockSchema = new mongoose.Schema({
  index: { type: Number, unique: true },
  timestamp: Number,
  data: [{ type: String }],
  shipmentId: { type: String },
  prevHash: String,
  proofOfWork: Number,
  currHash: String
}, { timestamps: true });

blockSchema.pre('save', function (next) {
  const block = this;

  if( this.currHash == null ) {
    block.currHash = sha1(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
    block.timestamp = Math.floor(Date.now() / 1000);
    helpers.LOGGER.debug(`assigning a new hash ${block.currHash} value`);

  } else { 
    helpers.LOGGER.debug(`leaving old hash ${this.currHash} value`);
  
  }
  next();
});

const Block = mongoose.model('Block', blockSchema);

export default Block;