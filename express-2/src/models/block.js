import sha1 from 'sha1';
import mongoose from 'mongoose';
import helpers from '../helpers';

import boom from '@hapi/boom';
import Milestone from './milestone';

const blockSchema = new mongoose.Schema({
  index: { type: Number, unique: true },
  timestamp: Number,
  data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }],
  prevHash: String,
  proofOfWork: Number,
  hash: String
}, { timestamps: true });

blockSchema.methods.getHash = function () {
  return sha1(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
}

blockSchema.pre('save', function (next) {
  const block = this;

  helpers.LOGGER.debug(`${block} saving all coins in memory`);

  this.data.forEach(function (chain) {

    chain.save((err, c) => {
      if (err) {
        next(boom.badImplementation(err));
      } else {
        helpers.LOGGER.debug(`${JSON.stringify(c)} saved to chains collection.`);
      }
    });
  });
  next();
}, (err) => {
  next(boom.badImplementation(err));
});

const Block = mongoose.model('Block', blockSchema);

export default Block;