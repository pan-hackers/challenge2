import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.location.getAll);
router.get('/:gln', middlewares.auths.verifyToken, controllers.location.getByGLN);
router.post('/', middlewares.auths.verifyToken, controllers.location.create);

export default router;
