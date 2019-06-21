import sha1 from 'sha1';
import mongoose from 'mongoose';
import boom from '@hapi/boom';
import helpers from '../helpers';
import Block from './block';

const blockchainSchema = new mongoose.Schema({
  chain: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block' }],
  currentTransactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coin' }]
}, { timestamps: true });

blockchainSchema.pre('save', function (next) {
  const blockchain = this;

  helpers.LOGGER.debug(`${blockchain} saving all block in memory`);

  this.chain.forEach(function (block) {

    block.save((err, b) => {
      if (err) {
        next(boom.badImplementation(err));
      } else {
        helpers.LOGGER.debug(`${JSON.stringify(b)} saved to blocks collection.`);
      }
    });
  });
  next();
  /*
  Block.updateMany(this.chain, {upsert: true}, function (err, res) {
    if (err) throw err;
  
    helpers.LOGGER.debug(`Saving all chain in memory - ${JSON.stringify(res)}`);
    next();
  });*/
}, (err) => {
  next(boom.badImplementation(err));
});

blockchainSchema.methods.addBlock = function (data) {
  let index = this.chain.length;
  let prevHash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : 0;
  let block = new Block(index, data, prevHash);

  this.chain.push(block);
};

blockchainSchema.methods.newBlock = function () {
  let index = this.chain.length;
  let block;
  if (index == 0) {

    block = new Block({
      index: index,
      data: this.currentTransactions,
      prevHash: index,
      proofOfWork: 100
    });
  } else {
    let prevHash = this.chain[this.chain.length - 1].hash;
    let prevProof = this.chain[this.chain.length - 1].proofOfWork;

    block = new Block({
      index: index,
      data: this.currentTransactions,
      prevHash: prevHash,
      proofOfWork: this.proofOfWork(prevProof)
    });
  }

  this.chain.push(block);
  this.currentTransactions = [];
};

blockchainSchema.methods.newTransaction = function (data) {
  this.currentTransactions.push(data);
};

blockchainSchema.methods.proofOfWork = function (lastProof) {
  let proof = 0;

  while (!this.validProof(lastProof, proof)) {
    proof++;
  }

  return proof;
};

blockchainSchema.methods.validProof = function (lastProof, proof) {
  let guessSha = sha1(JSON.stringify("f" + lastProof + "" + proof));

  return guessSha.substr(guessSha.length - 4) == "0000";
}

blockchainSchema.methods.chainIsValid = function () {

  for (var i = 0; i < this.chain.length; i++) {
    if (this.chain[i].hash !== this.chain[i].getHash())
      return false;

    if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash)
      return false;
  }
  return true;
}

blockchainSchema.statics.load = async function (next) {
  let bc = await this.findOne({})
    .populate('chain')
    .populate('currentTransactions')
    .populate('currentTransactions')
    .populate('chain.data')
    .populate('currentTransactions.data')
    .exec((err, blockchain) => {
      if (err) {
        next(boom.badImplementation(err));
      }

      if (!blockchain) {
        blockchain = new models.Blockchain();
      }

      return blockchain;
    });

    return bc;
};

blockchainSchema.statics.save = async function (bc, next) {
  bc.save((err, b) => {
    if (err) {
      next(boom.badImplementation(err));
    } else {
      helpers.LOGGER.debug(`blockchain saved to blocks collection.`);

      next();
    }
  });
};

const Blockchain = mongoose.model('Blockchain', blockchainSchema);

export default Blockchain;