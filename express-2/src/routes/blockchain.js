/* eslint-disable no-param-reassign */

import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.blockchain.loadBlockchain)
router.post('/', middlewares.auths.verifyToken, controllers.blockchain.saveBlockchain)
router.post('/transactions/new', middlewares.auths.verifyToken, controllers.blockchain.createTransaction);
router.post('/mine', middlewares.auths.verifyToken, controllers.blockchain.foo);
router.get('/chain', middlewares.auths.verifyToken, controllers.blockchain.foo);

export default router;
