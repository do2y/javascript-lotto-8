import { LOTTO } from "../utils/constants.js";
import { ERROR_MESSAGES } from "../utils/error.js";

class Validator {
  static validatePurchaseAmount(amount) {
    const lottoAmount = Number(amount);

    if (!Number.isInteger(lottoAmount) || lottoAmount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
    }
  }
}

export default Validator;
