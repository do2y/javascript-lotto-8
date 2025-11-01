import { Console } from '@woowacourse/mission-utils';

class Printer {
  static printPurchasedAmount(count) {
    Console.print(`\n${count}개를 구매했습니다.`);
  }

  static printLottoTickets(tickets) {
    tickets.forEach((ticket) => {
      Console.print(`[${ticket.getNumbers().join(', ')}]`);
    });
  }

  static printStatistics(statistics) {
    Console.print('\n당첨 통계\n---');
    Console.print(`3개 일치 (5,000원) - ${statistics.MATCH_3}개`);
    Console.print(`4개 일치 (50,000원) - ${statistics.MATCH_4}개`);
    Console.print(`5개 일치 (1,500,000원) - ${statistics.MATCH_5}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${statistics.MATCH_5_BONUS}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${statistics.MATCH_6}개`);
  }

  static printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default Printer;
