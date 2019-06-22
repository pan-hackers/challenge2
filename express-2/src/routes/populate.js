import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/companies', controllers.populate.populateCompanies);
router.get('/locations', controllers.populate.populateLocations);
router.delete('/all', controllers.populate.cleanAll);

export default router;
