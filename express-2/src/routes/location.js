import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.location.getAll);
router.get('/:gln', controllers.location.getByGLN);
router.post('/', controllers.location.create);

export default router;
