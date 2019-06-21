import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auths.verifyToken, controllers.company.getAll);
router.get('/:gcp', middlewares.auths.verifyToken, controllers.company.getByGCP);

export default router;
