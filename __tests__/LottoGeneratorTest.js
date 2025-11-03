import LottoGenerator from '../src/domain/LottoGenerator.js';
import { LOTTO } from '../src/utils/constants.js';

describe('LottoGenerator 클래스 테스트', () => {
  describe('generateTickets()', () => {
    let tickets;
    let numbers;

    beforeEach(() => {
      tickets = LottoGenerator.generateTickets(1000);
      numbers = tickets[0].getNumbers();
    });

    test('입력 금액에 맞는 개수의 로또 티켓이 생성된다.', () => {
      const manyTickets = LottoGenerator.generateTickets(8000);
      expect(manyTickets).toHaveLength(8);
    });

    test('각 티켓은 6개의 숫자를 가진다.', () => {
      expect(numbers).toHaveLength(LOTTO.COUNT);
    });

    test('각 숫자는 1~45 범위 내의 정수여야 한다.', () => {
      numbers.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(LOTTO.MIN);
        expect(num).toBeLessThanOrEqual(LOTTO.MAX);
        expect(Number.isInteger(num)).toBe(true);
      });
    });

    test('한 장의 로또에는 중복된 숫자가 없어야 한다.', () => {
      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(numbers.length);
    });
  });
});
