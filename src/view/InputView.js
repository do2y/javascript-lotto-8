import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../utils/messages.js';

class InputView {
  static async readPurchaseAmount() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.PURCHASE_AMOUNT);
    return input.trim();
  }

  static async readLottoNumbers() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.WINNING_NUMBERS);
    return input.trim();
  }

  static async readBonusNumber() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.BONUS_NUMBER);
    return input.trim();
  }
}

export default InputView;
