import { Console } from '@woowacourse/mission-utils';

// 1. 로또 수량, 2. 로또 티켓, 3. 당첨 통계, 4. 수익률 출력
class Printer {
  static printPurchasedAmount(count) {
    Console.print(`\n${count}개를 구매했습니다.`);
  }

  static printLottoTickets(tickets) {
    tickets.forEach((ticket) => {
      Console.print(`[${ticket.getNumbers().join(', ')}]`);
    });
  }

  //   static printStatistics(result) {
  //     Console.print('\n당첨 통계\n---');

  //   }

  static printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default Printer;
