import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.event.getAll);
router.get('/:sscc', middlewares.auths.verifyToken, controllers.event.getBySSCC);
router.post('/', middlewares.auths.verifyToken, controllers.event.create);

export default router;
