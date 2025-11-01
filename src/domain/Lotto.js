import { ERROR_MESSAGES } from "../utils/error.js";
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
  }

  // TODO: 추가 기능 구현
}

export default Lotto;
