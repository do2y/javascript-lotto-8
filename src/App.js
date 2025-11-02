import LottoGenerator from './domain/LottoGenerator.js';
import Printer from './view/Printer.js';
import LottoResult from './domain/LottoResult.js';
import InputHandler from './view/InputHandler.js';

class App {
  async run() {
    const purchaseAmount = await InputHandler.readPurchaseAmount();
    const tickets = LottoGenerator.generateTickets(purchaseAmount);

    Printer.printPurchasedAmount(tickets.length);
    Printer.printLottoTickets(tickets);

    const winningNumbers = await InputHandler.readWinningNumbers();
    const bonusNumber = await InputHandler.readBonusNumber(winningNumbers);

    const result = new LottoResult(tickets, winningNumbers, bonusNumber);
    Printer.printStatistics(result.getStatistics());
    Printer.printProfitRate(result.getProfitRate());
  }
}

export default App;
