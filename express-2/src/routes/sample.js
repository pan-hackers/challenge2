import { Router } from 'express';
import boom from '@hapi/boom';

const router = Router();

router.get('/', (req, res, next) => {
  const response = { description: 'Welcome to Blockchain APIs' };

  //res.send(boom.badRequest('missing id'));
  next(boom.badRequest('missing id'));
  //return next(boom.badRequest('missing id'));

  //return res.json(response);
});

export default router;
