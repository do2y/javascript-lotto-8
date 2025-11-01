class LottoResult {
  #tickets;
  #winningNumbers;
  #bonusNumber;
  #statistics;

  constructor(tickets, winningNumbers, bonusNumber) {
    this.#tickets = tickets;
    this.#winningNumbers = winningNumbers.map(Number);
    this.#bonusNumber = Number(bonusNumber);
    this.#statistics = { 3: 0, 4: 0, 5: 0, '5+bonus': 0, 6: 0 }; //결과 표
    this.#calculateStatistics();
  }

  #countMatchingNumbers(numbers) {
    return numbers.filter((num) => this.#winningNumbers.includes(num)).length;
  }

  #updateWinningStats(matchCount, hasBonus) {
    if (matchCount === 6) {
      this.#statistics[6]++;
      return;
    }
    if (matchCount === 5 && hasBonus) {
      this.#statistics['5+bonus']++;
      return;
    }
    if (matchCount === 5) {
      this.#statistics[5]++;
      return;
    }
    if (matchCount === 4) {
      this.#statistics[4]++;
      return;
    }
    if (matchCount === 3) {
      this.#statistics[3]++;
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

  #getTotalReward() {
    // TODO: 총상금 계산
  }

  getProfitRate() {
    const totalReward = this.#getTotalReward;
    // TODO: 수익률 계산
  }
}
