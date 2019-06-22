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
  hash: String
}, { timestamps: true });

blockSchema.pre('save', function (next) {
  const block = this;

  helpers.LOGGER.debug(`${block} assigning a hash value`);
  block.hash = sha1(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
  block.timestamp = Math.floor(Date.now() / 1000);
  next();
});

const Block = mongoose.model('Block', blockSchema);

export default Block;