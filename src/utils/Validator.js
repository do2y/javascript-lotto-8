import { LOTTO } from "../utils/constants";
import { ERROR_MESSAGES } from "../utils/error";

class Validator {
  static validatePurchaseAmount(amount) {
    const lottoAmount = Number(amount);

    if (!Number.isInteger(lottoAmount) || lottoAmount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
    }
  }
}

export default Validator;
