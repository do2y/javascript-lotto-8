import { LOTTO } from '../utils/constants.js';
import { ERROR_MESSAGES } from '../utils/error.js';

class Validator {
  static validatePurchaseAmount(amount) {
    if (amount === null || amount === undefined || amount === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
    }

    if (!/^\d+$/.test(amount)) {
      throw new Error(ERROR_MESSAGES.INVALID_POSITIVE_NUMBER);
    }

    const lottoAmount = Number(amount);

    if (!Number.isInteger(lottoAmount) || lottoAmount <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_POSITIVE_NUMBER);
    }

    if (lottoAmount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
    }

    return lottoAmount;
  }

  static validateWinningNumbersInput(input) {
    if (typeof input !== 'string' || input.trim() === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
    }

    if (/,{2,}/.test(input)) {
      throw new Error(ERROR_MESSAGES.INVALID_DELIMITER);
    }

    const numbers = input.split(',').map((n) => Number(n.trim()));
    this.validateWinningNumbers(numbers);
    return numbers;
  }

  static validateWinningNumbers(numbers) {
    this.#validateArrayAndLength(numbers);
    this.#validateNumberTypeAndRange(numbers);
    this.#validateNoDuplicates(numbers);
  }

  static #validateArrayAndLength(numbers) {
    if (!Array.isArray(numbers)) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBER);
    }

    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
  }

  static #validateNumberTypeAndRange(numbers) {
    const isInvalidType = numbers.some((n) => typeof n !== 'number' || Number.isNaN(n));
    const isOutOfRange = numbers.some((n) => n < LOTTO.MIN || n > LOTTO.MAX);

    if (isInvalidType) throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBER);
    if (isOutOfRange) throw new Error(ERROR_MESSAGES.INVALID_RANGE);
  }

  static #validateNoDuplicates(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
    }
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    if (bonusNumber === null || bonusNumber === undefined || bonusNumber === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
    }

    const num = Number(bonusNumber);

    if (Number.isNaN(num)) {
      throw new Error(ERROR_MESSAGES.INVALID_RANGE);
    }

    this.#validateBonusRange(num);
    this.#validateBonusUniqueness(num, winningNumbers);
  }

  static #validateBonusRange(num) {
    if (!Number.isInteger(num) || num < LOTTO.MIN || num > LOTTO.MAX) {
      throw new Error(ERROR_MESSAGES.INVALID_RANGE);
    }
  }

  static #validateBonusUniqueness(num, winningNumbers) {
    if (winningNumbers.includes(num)) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_BONUS_NUMBER);
    }
  }
}

export default Validator;
