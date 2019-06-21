import mongoose from 'mongoose';

import TokenKey from './key';
import User from './user';
import Company from './company';
import Location from './location';
import ConsumableUnit from './consumableUnit';
import Message from './message';
import Coin from './coin';
import Block from './block';
import Blockchain from './blockchain';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const models = { User, Company, Location, ConsumableUnit, Message, Coin, Block, Blockchain };

export { connectDb, TokenKey };

export default models;