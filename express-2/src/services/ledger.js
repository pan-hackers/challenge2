
import helpers from '../helpers';
import models from '../models';

let ledger;
const LEDGER = (next) => {
  helpers.LOGGER.info("LEDGER called");
  if (!ledger) {
    helpers.LOGGER.info("LEDGER going to fill it");
    ledger = models.Blockchain.load(next);
  }
  return ledger;
}

export default LEDGER;