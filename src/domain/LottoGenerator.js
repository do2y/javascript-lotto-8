import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { LOTTO } from '../utils/constants.js';

class LottoGenerator {
  static generateTickets(amount) {
    const ticketCount = amount / LOTTO.price;

    const tickets = [];
    for (let i = 0; i < ticketCount; i++) {
      const numbers = Random.pickUniqueNumbersInRange(
        LOTTO.MIN,
        LOTTO.MAX,
        LOTTO.COUNT,
      );

      const ticket = new Lotto(numbers);
      tickets.push(ticket);
    }

    return tickets;
  }
}

export default LottoGenerator;
