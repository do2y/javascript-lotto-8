import LottoResult from '../src/domain/LottoResult.js';
import Lotto from '../src/domain/Lotto.js';
import { PRIZE, LOTTO } from '../src/utils/constants.js';

describe('LottoResult 클래스 테스트', () => {
  let winningNumbers;
  let bonusNumber;

  beforeEach(() => {
    winningNumbers = [1, 2, 3, 4, 5, 6];
    bonusNumber = 7;
  });

  describe('#calculateStatistics()', () => {
    test('당첨 통계가 정확하게 계산된다.', () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]), // 6개 일치 - 1등
        new Lotto([1, 2, 3, 4, 5, 7]), // 5개 + 보너스 - 2등
        new Lotto([1, 2, 3, 4, 5, 8]), // 5개 - 3등
        new Lotto([1, 2, 3, 4, 9, 10]), // 4개 - 4등
        new Lotto([1, 2, 3, 11, 12, 13]), // 3개 - 5등
        new Lotto([20, 21, 22, 23, 24, 25]), // 꽝
      ];

      const result = new LottoResult(tickets, winningNumbers, bonusNumber);
      const stats = result.getStatistics();

      expect(stats).toEqual({
        MATCH_3: 1,
        MATCH_4: 1,
        MATCH_5: 1,
        MATCH_5_BONUS: 1,
        MATCH_6: 1,
      });
    });

    test('총 상금이 정확하게 계산된다.', () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]), // 1등
        new Lotto([1, 2, 3, 4, 5, 7]), // 2등
      ];

      const result = new LottoResult(tickets, winningNumbers, bonusNumber);
      const totalPrize = PRIZE.MATCH_6 + PRIZE.MATCH_5_BONUS;
      const expectedRate = ((totalPrize / (tickets.length * LOTTO.PRICE)) * 100).toFixed(1);

      expect(result.getProfitRate()).toBe(expectedRate);
    });
  });

  describe('#getProfitRate()', () => {
    test('수익률은 소수점 첫째 자리까지 반올림된다.', () => {
      const tickets = [new Lotto([1, 2, 3, 4, 5, 6]), new Lotto([10, 11, 12, 13, 14, 15])];

      const result = new LottoResult(tickets, winningNumbers, bonusNumber);
      const profitRate = result.getProfitRate();

      expect(typeof profitRate).toBe('string');
      expect(profitRate).toMatch(/^\d+(\.\d{1})?$/);
    });
  });
});
