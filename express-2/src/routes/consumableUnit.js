import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.consumableUnit.getAll);
router.get('/:gtin', middlewares.auths.verifyToken, controllers.consumableUnit.getByGTIN);
router.post('/', middlewares.auths.verifyToken, controllers.consumableUnit.create);

export default router;
