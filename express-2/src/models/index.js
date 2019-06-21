import mongoose from 'mongoose';

import TokenKey from './key';
import User from './user';
import Message from './message';
import Coin from './coin';
import Block from './block';
import Blockchain from './blockchain';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const models = { User, Message, Coin, Block, Blockchain };

export { connectDb, TokenKey };

export default models;
