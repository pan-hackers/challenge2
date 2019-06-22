/* eslint-disable no-param-reassign */

import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/', controllers.blockchain.loadBlockchain)
router.post('/', controllers.blockchain.saveBlockchain)
router.post('/transactions/new', controllers.blockchain.createTransaction);
router.post('/mine', controllers.blockchain.foo);
router.get('/chain', controllers.blockchain.foo);

export default router;
