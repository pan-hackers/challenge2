import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.milestone.getAll);
router.post('/', middlewares.auths.verifyToken, controllers.milestone.create);

export default router;
