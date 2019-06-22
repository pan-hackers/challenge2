import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.shipment.getAll);
router.get('/:sscc', controllers.shipment.getBySSCC);
router.post('/', controllers.shipment.create);

export default router;
