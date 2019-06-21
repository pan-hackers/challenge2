import { Router } from 'express';

import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();

router.post('/signup', controllers.user.signup);
router.post('/signin', controllers.user.signin);
router.get('/', middlewares.auths.verifyToken, controllers.user.getAll);
router.get('/:username', middlewares.auths.verifyToken, controllers.user.getByUsername);

export default router;
