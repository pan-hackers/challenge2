import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  amount: Number
}, { timestamps: true });

const Coin = mongoose.model('Coin', coinSchema);

export default Coin;