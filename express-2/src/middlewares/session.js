
import helpers from '../helpers';
import controllers from '../controllers';

const session = (req, res, next) => {
  helpers.LOGGER.info("middleware - 'session' - called");
  if (req.blockchain) {
    next();
  }

  
  next();
};

export default session;