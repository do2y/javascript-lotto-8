import { LOTTO } from '../utils/constants.js';
import { ERROR_MESSAGES } from '../utils/error.js';

class Validator {
  static validatePurchaseAmount(amount) {
    const lottoAmount = Number(amount);

    if (!Number.isInteger(lottoAmount) || lottoAmount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
    }
  }

  static validateWinningNumbers(winningNumbers) {
    if (winningNumbers.some((num) => Number.isNaN(num))) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBER);
    }

    if (winningNumbers.some((num) => num < LOTTO.MIN || num > LOTTO.MAX)) {
      throw new Error(ERROR_MESSAGES.INVALID_RANGE);
    }

    const uniqueNumbers = new Set(winningNumbers);
    if (uniqueNumbers.size !== winningNumbers.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_NUMBER);
    }
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    const num = Number(bonusNumber);

    if (!Number.isInteger(num) || num < LOTTO.MIN || num < LOTTO.MAX) {
      throw new Error(ERROR_MESSAGES.INVALID_RANGE);
    }

    if (winningNumbers.includes(num)) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
    }
  }
}

export default Validator;
