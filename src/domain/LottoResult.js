import { PRIZE, LOTTO } from '../utils/constants';

class LottoResult {
  #tickets;
  #winningNumbers;
  #bonusNumber;
  #statistics;

  constructor(tickets, winningNumbers, bonusNumber) {
    this.#tickets = tickets;
    this.#winningNumbers = winningNumbers.map(Number);
    this.#bonusNumber = Number(bonusNumber);
    this.#statistics = {
      MATCH_3: 0,
      MATCH_4: 0,
      MATCH_5: 0,
      MATCH_5_BONUS: 0,
      MATCH_6: 0,
    };
    this.#calculateStatistics();
  }

  #countMatchingNumbers(numbers) {
    return numbers.filter((num) => this.#winningNumbers.includes(num)).length;
  }

  #updateWinningStats(matchCount, hasBonus) {
    if (matchCount === 6) {
      this.#statistics.MATCH_6++;
      return;
    }

    if (matchCount === 5 && hasBonus) {
      this.#statistics.MATCH_5_BONUS++;
      return;
    }

    if (matchCount === 5) {
      this.#statistics.MATCH_5++;
      return;
    }

    if (matchCount === 4) {
      this.#statistics.MATCH_4++;
      return;
    }

    if (matchCount === 3) {
      this.#statistics.MATCH_3++;
    }
  }

  #calculateStatistics() {
    this.#tickets.forEach((ticket) => {
      const numbers = ticket.getNumbers();
      const matchCount = this.#countMatchingNumbers(numbers);
      const hasBonus = numbers.includes(this.#bonusNumber);

      this.#updateWinningStats(matchCount, hasBonus);
    });
  }

  #getTotalPrize() {
    return (
      this.#statistics.MATCH_3 * PRIZE.MATCH_3 +
      this.#statistics.MATCH_4 * PRIZE.MATCH_4 +
      this.#statistics.MATCH_5 * PRIZE.MATCH_5 +
      this.#statistics.MATCH_5_BONUS * PRIZE.MATCH_5_BONUS +
      this.#statistics.MATCH_6 * PRIZE.MATCH_6
    );
  }

  getStatistics(result) {
    return { ...this.#statistics };
  }

  getProfitRate() {
    const spent = this.#tickets.length * LOTTO.PRICE;
    const totalPrize = this.#getTotalPrize();
    const profitRate = (totalPrize / spent) * 100;
    return profitRate.toFixed(1);
  }
}

export default LottoResult;
