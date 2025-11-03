import LottoGenerator from '../src/domain/LottoGenerator.js';
import { LOTTO } from '../src/utils/constants.js';

describe('LottoGenerator 클래스 테스트', () => {
  describe('generateTickets()', () => {
    test('입력 금액에 맞는 개수의 로또 티켓이 생성된다.', () => {
      const tickets = LottoGenerator.generateTickets(8000);
      expect(tickets).toHaveLength(8);
    });

    test('각 티켓은 6개의 숫자를 가진다.', () => {
      const tickets = LottoGenerator.generateTickets(1000);
      const numbers = tickets[0].getNumbers();
      expect(numbers).toHaveLength(LOTTO.COUNT);
    });

    test('각 숫자는 1~45 범위 내의 정수여야 한다.', () => {
      const tickets = LottoGenerator.generateTickets(1000);
      const numbers = tickets[0].getNumbers();
      numbers.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(LOTTO.MIN);
        expect(num).toBeLessThanOrEqual(LOTTO.MAX);
        expect(Number.isInteger(num)).toBe(true);
      });
    });

    test('한 장의 로또에는 중복된 숫자가 없어야 한다.', () => {
      const tickets = LottoGenerator.generateTickets(1000);
      const numbers = tickets[0].getNumbers();
      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(numbers.length);
    });
  });
});
