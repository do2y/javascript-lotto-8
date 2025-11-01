import { PRIZE } from '../utils/constants';

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

  #calculateStatistics(tickets) {
    tickets.forEach((ticket) => {
      const nums = ticket.getNumbers();
      const cnt = this.#countMatchingNumbers(nums);
      const hasBonus = nums.includes(this.#bonusNumber);

      this.#updateWinningStats(cnt, hasBonus); //당첨 업데이트 - 등수
    });
  }

  #getTotalPrize() {
    // TODO: 총상금 계산
  }

  getProfitRate() {
    const totalPrize = this.#getTotalPrize;
    // TODO: 수익률 계산
  }
}
