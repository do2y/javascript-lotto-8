import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import Validator from '../utils/Validator.js';
import Parser from '../utils/Parser.js';

class InputHandler {
  static async readPurchaseAmount() {
    return this.#retryUntilValid(InputView.readPurchaseAmount, (input) =>
      Validator.validatePurchaseAmount(input)
    );
  }

  static async readWinningNumbers() {
    return this.#retryUntilValid(InputView.readLottoNumbers, (input) => {
      const numbers = Parser.parseLottoNumbers(input);
      Validator.validateWinningNumbers(numbers);
      return numbers;
    });
  }

  static async readBonusNumber(winningNumbers) {
    return this.#retryUntilValid(InputView.readBonusNumber, (input) => {
      const number = Number(input);
      Validator.validateBonusNumber(number, winningNumbers);
      return number;
    });
  }

  static async #retryUntilValid(readFn, validateFn) {
    while (true) {
      try {
        const input = await readFn();
        return validateFn(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default InputHandler;
