import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/companies', controllers.populate.populateCompanies);
router.get('/locations', controllers.populate.populateLocations);
router.get('/consumableUnits', controllers.populate.populateConsumableUnits);
router.get('/tradeUnits', controllers.populate.populateTradeUnits);
router.get('/logisticUnits', controllers.populate.populateLogisticUnits);
router.delete('/all', controllers.populate.cleanAll);
router.get('/all', controllers.populate.populateAll);

export default router;
