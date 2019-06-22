import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.company.getAll);
router.get('/:gcp', controllers.company.getByGCP);
router.post('/', controllers.company.create);

export default router;
