/* eslint-disable no-param-reassign */

import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/', controllers.blockchain.getOne);
router.post('/milestone/new', controllers.blockchain.createMilestone);
//router.post('/mine', controllers.blockchain.foo);
//router.get('/chain', controllers.blockchain.foo);

export default router;
