/* eslint-disable no-param-reassign */

import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.use('/:messageId', middlewares.message);

router.get('/', controllers.message.getAll);
router.get('/:messageId', controllers.message.getById);
router.post('/', controllers.message.create);
router.put('/:messageId', controllers.message.modify);
router.patch('/:messageId', controllers.message.patch);
router.delete('/:messageId', controllers.message.delete);

export default router;
