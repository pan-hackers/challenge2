import 'dotenv/config';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import helmet from 'helmet';
//import morgan from 'morgan';

import jwt from 'express-jwt';

import helpers from './helpers';
import middlewares from './middlewares';
import routes from './routes';

import { connectDb } from './models';
import { LEDGER } from './services';

const app = express();

app.use(helmet());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(morgan('combined'));

/* Own middlewares */
//app.use(middlewares.auth);

/* Own APIs */
app.use('/api/users', routes.user);
app.use('/api/samples', routes.sample);
app.use('/api/messages', routes.message);
app.use('/api/blockchain', routes.blockchain);

// Application global error handler
app.use(middlewares.errorHandler);

connectDb().then(async () => {
  app.listen(process.env.PORT, () => helpers.LOGGER.info(`Blockchain Supply Chain App is listening on port ${process.env.PORT}!`));
});
