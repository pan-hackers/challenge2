import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.logisticUnit.getAll);
router.get('/:gtin', controllers.logisticUnit.getByGTIN);
router.post('/', controllers.logisticUnit.create);
router.post('/:gtin', controllers.logisticUnit.attachTU);
router.post('/:gtin/shipment', controllers.logisticUnit.attachShipment);

export default router;
