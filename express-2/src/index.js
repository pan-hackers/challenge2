import 'dotenv/config';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import helmet from 'helmet';
//import morgan from 'morgan';

import helpers from './helpers';
import middlewares from './middlewares';
import routes from './routes';

import { connectDb } from './models';

const app = express();

app.use(helmet());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(morgan('combined'));
app.use('/static', express.static(__dirname + '/public'));

/* Own middlewares */

/* Own APIs */
app.use('/api/users', routes.user);
app.use('/api/messages', routes.message);
app.use('/api/companies', routes.company);
app.use('/api/locations', routes.location);
app.use('/api/consumableUnits', routes.consumableUnit);
app.use('/api/tradeUnits', routes.tradeUnit);
app.use('/api/logisticUnits', routes.logisticUnit);
app.use('/api/shipments', routes.shipment);
app.use('/api/events', routes.event);
app.use('/api/blockchain', routes.blockchain);

// Application global error handler
app.use(middlewares.errorHandler);

connectDb().then(async () => {
  app.listen(process.env.PORT, () => helpers.LOGGER.info(`Blockchain Supply Chain App is listening on port ${process.env.PORT}!`));
});
