import mongoose from 'mongoose';

import Company from './company';
import Location from './location';
import ConsumableUnit from './consumableUnit';
import TradeUnit from './tradeUnit';
import LogisticUnit from './logisticUnit';
import Shipment from './shipment';
import Milestone from './milestone';
import Event from './event';
import Message from './message';
import Block from './block';
import Blockchain from './blockchain';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const models = { Company, Location, ConsumableUnit, TradeUnit, 
    LogisticUnit, Shipment, Message, 
    Event, Milestone,
    Block, Blockchain };

export { connectDb };

export default models;
