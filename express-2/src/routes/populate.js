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
router.post('/shipments', controllers.populate.createShipment);
router.post('/shipments/:id/milestones/pup', controllers.populate.populateMilestonePUP);
router.post('/shipments/:id/milestones/dep', controllers.populate.populateMilestoneDEP);
router.post('/shipments/:id/milestones/arr', controllers.populate.populateMilestoneARR);
router.post('/shipments/:id/milestones/pod', controllers.populate.populateMilestonePOD);


export default router;
