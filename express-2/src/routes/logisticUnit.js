import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.logisticUnit.getAll);
router.get('/:gtin', middlewares.auths.verifyToken, controllers.logisticUnit.getByGTIN);
router.post('/', middlewares.auths.verifyToken, controllers.logisticUnit.create);
router.post('/:gtin', middlewares.auths.verifyToken, controllers.logisticUnit.attachTU);
router.post('/:gtin/shipment', middlewares.auths.verifyToken, controllers.logisticUnit.attachShipment);

export default router;
