import mongoose from 'mongoose';
import fs from 'fs';

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

//const connectDb = () => mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
//Specify the Amazon DocumentDB cert
var ca = [fs.readFileSync(__dirname + "/rds-combined-ca-bundle.pem")];
var devDBURL = 'mongodb://kosmos:root1234@docdb-2019-06-21-18-57-30.cluster-cmclwftd5yib.us-east-1.docdb.amazonaws.com:27017/test?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred';

const connectDb = () => mongoose.connect(devDBURL, {
    sslValidate: true,
    sslCA:ca,
    useNewUrlParser: true
});

const models = { Company, Location, ConsumableUnit, TradeUnit, 
    LogisticUnit, Shipment, Message, 
    Event, Milestone,
    Block, Blockchain };

export { connectDb };

export default models;
