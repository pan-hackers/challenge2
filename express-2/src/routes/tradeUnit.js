import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.tradeUnit.getAll);
router.get('/:gtin', controllers.tradeUnit.getByGTIN);
router.post('/', controllers.tradeUnit.create);
router.post('/:gtin', controllers.tradeUnit.attachCU);
router.post('/:gtin/shipment', controllers.tradeUnit.attachShipment);

export default router;
