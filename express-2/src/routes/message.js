/* eslint-disable no-param-reassign */

import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.use('/:messageId', middlewares.message);

router.get('/', middlewares.auths.verifyToken, controllers.message.getAll);
router.get('/:messageId', middlewares.auths.verifyToken, controllers.message.getById);
router.post('/', middlewares.auths.verifyToken, controllers.message.create);
router.put('/:messageId', middlewares.auths.verifyToken, controllers.message.modify);
router.patch('/:messageId', middlewares.auths.verifyToken, controllers.message.patch);
router.delete('/:messageId', middlewares.auths.verifyToken, controllers.message.delete);

export default router;
