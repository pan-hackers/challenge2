import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.event.getAll);
router.get('/:sscc', controllers.event.getBySSCC);
router.post('/', controllers.event.create);

export default router;
