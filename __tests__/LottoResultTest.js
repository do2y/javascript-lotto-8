import LottoResult from '../src/domain/LottoResult.js';
import Lotto from '../src/domain/Lotto.js';
import { PRIZE } from '../src/utils/constants.js';

describe('LottoResult 클래스 테스트', () => {
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

      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const result = new LottoResult(tickets, winningNumbers, bonusNumber);
      const stats = result.getStatistics();

      expect(stats.MATCH_6).toBe(1);
      expect(stats.MATCH_5_BONUS).toBe(1);
      expect(stats.MATCH_5).toBe(1);
      expect(stats.MATCH_4).toBe(1);
      expect(stats.MATCH_3).toBe(1);
    });

    test('총 상금이 정확하게 계산된다.', () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]), // 1등
        new Lotto([1, 2, 3, 4, 5, 7]), // 2등
      ];

      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const result = new LottoResult(tickets, winningNumbers, bonusNumber);
      const totalPrize = PRIZE.MATCH_6 + PRIZE.MATCH_5_BONUS; // 1등 + 2등 금액 합

      const profitRate = result.getProfitRate();

      expect(Number(profitRate)).toBeCloseTo((totalPrize / (tickets.length * 1000)) * 100, 1);
    });
  });

  describe('#getProfitRate', () => {
    test('수익률은 소수점 첫째 자리까지 반올림된다.', () => {
      const tickets = [new Lotto([1, 2, 3, 4, 5, 6]), new Lotto([10, 11, 12, 13, 14, 15])];

      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const result = new LottoResult(tickets, winningNumbers, bonusNumber);
      const profitRate = result.getProfitRate();

      expect(typeof profitRate).toBe('string');
      expect(profitRate).toMatch(/^\d+(\.\d)?$/);
    });
  });
});
