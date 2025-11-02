import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import Printer from './view/Printer.js';
import Validator from './utils/Validator.js';
import LottoGenerator from './domain/LottoGenerator.js';
import LottoResult from './domain/LottoResult.js';
import Parser from './utils/Parser.js';

class App {
  async run() {
    const purchaseAmount = await this.#readPurchaseAmount();
    const tickets = LottoGenerator.generateTickets(purchaseAmount);

    Printer.printPurchasedAmount(tickets.length);
    Printer.printLottoTickets(tickets);

    const winningNumbers = await this.#readWinningNumbers();
    const bonusNumber = await this.#readBonusNumber(winningNumbers);

    const result = new LottoResult(tickets, winningNumbers, bonusNumber);
    Printer.printStatistics(result.getStatistics());
    Printer.printProfitRate(result.getProfitRate());
  }

  async #readPurchaseAmount() {
    while (true) {
      try {
        const input = await InputView.readPurchaseAmount();
        const amount = Validator.validatePurchaseAmount(input);
        return amount;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async #readWinningNumbers() {
    while (true) {
      try {
        const input = await InputView.readLottoNumbers();
        const parsedNumbers = Parser.parseLottoNumbers(input);
        Validator.validateWinningNumbers(parsedNumbers);
        return parsedNumbers;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async #readBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await InputView.readBonusNumber();
        const parsedNumber = Number(input);
        Validator.validateBonusNumber(parsedNumber, winningNumbers);
        return parsedNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default App;
