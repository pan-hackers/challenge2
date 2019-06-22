import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.consumableUnit.getAll);
router.get('/:gtin', controllers.consumableUnit.getByGTIN);
router.post('/', controllers.consumableUnit.create);

export default router;
