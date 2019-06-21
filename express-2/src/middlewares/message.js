
import helpers from '../helpers';
import controllers from '../controllers';

const message = (req, res, next) => {
  helpers.LOGGER.info("middleware - '/:messageId' - called");
  controllers.message.getAndStoreById(req, res, next);
};

export default message;