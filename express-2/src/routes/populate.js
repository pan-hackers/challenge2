import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.post('/companies', controllers.populate.populateCompanies);
router.post('/locations', controllers.populate.populateLocations);
router.post('/consumableUnits', controllers.populate.populateConsumableUnits);
router.post('/tradeUnits', controllers.populate.populateTradeUnits);
router.post('/logisticUnits', controllers.populate.populateLogisticUnits);
router.delete('/all', controllers.populate.cleanAll);
router.post('/all', controllers.populate.populateAll);

export default router;
