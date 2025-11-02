import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../utils/messages.js';

class Printer {
  static printPurchasedAmount(count) {
    Console.print(MESSAGES.OUTPUT.PURCHASE_RESULT(count));
  }

  static printLottoTickets(tickets) {
    tickets.forEach((ticket) => {
      Console.print(`[${ticket.getNumbers().join(', ')}]`);
    });
  }

  static printStatistics(statistics) {
    Console.print(MESSAGES.OUTPUT.STATISTICS_TITLE);
    Console.print(MESSAGES.OUTPUT.MATCH_3(statistics.MATCH_3));
    Console.print(MESSAGES.OUTPUT.MATCH_4(statistics.MATCH_4));
    Console.print(MESSAGES.OUTPUT.MATCH_5(statistics.MATCH_5));
    Console.print(MESSAGES.OUTPUT.MATCH_5_BONUS(statistics.MATCH_5_BONUS));
    Console.print(MESSAGES.OUTPUT.MATCH_6(statistics.MATCH_6));
  }

  static printProfitRate(profitRate) {
    Console.print(MESSAGES.OUTPUT.PROFIT_RATE(profitRate));
  }
}

export default Printer;
