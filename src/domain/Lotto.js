import { ERROR_MESSAGES } from "../utils/error.js";
import { LOTTO } from "../utils/constants.js";
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }

    if (numbers.some((num) => typeof num !== "number" || Number.isNaN(num))) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBER);
    }

    if (numbers.some((num) => num < LOTTO.MIN || num > LOTTO.MAX)) {
      throw new Error(ERROR_MESSAGES.INVALID_RANGE);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
