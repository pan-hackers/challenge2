import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.milestone.getAll);
router.post('/', controllers.milestone.create);

export default router;
