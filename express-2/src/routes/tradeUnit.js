import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.tradeUnit.getAll);
router.get('/:gtin', middlewares.auths.verifyToken, controllers.tradeUnit.getByGTIN);
router.post('/', middlewares.auths.verifyToken, controllers.tradeUnit.create);
router.post('/:gtin', middlewares.auths.verifyToken, controllers.tradeUnit.attachCU);
router.post('/:gtin/shipment', middlewares.auths.verifyToken, controllers.tradeUnit.attachShipment);

export default router;
