import 'dotenv/config';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import helmet from 'helmet';
//import morgan from 'morgan';

import helpers from './helpers';
import middlewares from './middlewares';
import routes from './routes';

import models from './models';

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
app.use('/api/v1/messages', routes.message);
app.use('/api/v1/companies', routes.company);
app.use('/api/v1/locations', routes.location);
app.use('/api/v1/consumableUnits', routes.consumableUnit);
app.use('/api/v1/tradeUnits', routes.tradeUnit);
app.use('/api/v1/logisticUnits', routes.logisticUnit);
app.use('/api/v1/shipments', routes.shipment);
app.use('/api/v1/events', routes.event);
app.use('/api/v1/populates', routes.populate);
app.use('/api/v1/blockchain', routes.blockchain);

// Application global error handler
app.use(middlewares.errorHandler);

// erasing the db at start
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.ConsumableUnit.deleteMany({}),
      models.TradeUnit.deleteMany({}),
      models.LogisticUnit.deleteMany({}),
      models.Location.deleteMany({}),
      models.Event.deleteMany({}),
      models.Milestone.deleteMany({}),
      models.Shipment.deleteMany({}),
      models.Company.deleteMany({}),
    ]);
  }

  app.listen(process.env.PORT, () => helpers.LOGGER.info(`Blockchain Supply Chain App is listening on port ${process.env.PORT}!`));
});
