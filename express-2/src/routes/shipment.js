import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.shipment.getAll);
router.get('/:sscc', middlewares.auths.verifyToken, controllers.shipment.getBySSCC);
router.post('/', middlewares.auths.verifyToken, controllers.shipment.create);

export default router;
