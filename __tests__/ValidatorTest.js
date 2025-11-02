import Validator from '../src/utils/Validator.js';
import { ERROR_MESSAGES } from '../src/utils/error.js';

describe('Validator 클래스 테스트', () => {
  describe('validatePurchaseAmount()', () => {
    test('구매 금액이 정수가 아니면 예외가 발생한다.', () => {
      expect(() => Validator.validatePurchaseAmount('a')).toThrow(ERROR_MESSAGES.INVALID_AMOUNT);
    });

    test('구매 금액이 1000원 단위가 아니면 예외가 발생한다.', () => {
      expect(() => Validator.validatePurchaseAmount(1500)).toThrow(ERROR_MESSAGES.INVALID_AMOUNT);
    });

    test('유효한 구매 금액이면 숫자로 반환한다.', () => {
      expect(Validator.validatePurchaseAmount('3000')).toBe(3000);
    });
  });

  describe('validateWinningNumbers()', () => {
    test('숫자가 아닌 값이 포함되면 예외가 발생한다.', () => {
      const invalidNumbers = [1, 'a', 3, 4, 5, 6];
      expect(() => Validator.validateWinningNumbers(invalidNumbers)).toThrow(
        ERROR_MESSAGES.INVALID_WINNING_NUMBER
      );
    });

    test('범위를 벗어난 숫자가 포함되면 예외가 발생한다.', () => {
      const invalidNumbers = [0, 2, 3, 4, 5, 6];
      expect(() => Validator.validateWinningNumbers(invalidNumbers)).toThrow(
        ERROR_MESSAGES.INVALID_RANGE
      );
    });

    test('중복된 숫자가 포함되면 예외가 발생한다.', () => {
      const duplicateNumbers = [1, 2, 3, 3, 4, 5];
      expect(() => Validator.validateWinningNumbers(duplicateNumbers)).toThrow(
        ERROR_MESSAGES.DUPLICATED_NUMBER
      );
    });

    test('모든 숫자가 유효하면 예외가 발생하지 않는다.', () => {
      const validNumbers = [1, 2, 3, 4, 5, 6];
      expect(() => Validator.validateWinningNumbers(validNumbers)).not.toThrow();
    });
  });

  describe('validateBonusNumber()', () => {
    test('정수가 아니면 예외가 발생한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      expect(() => Validator.validateBonusNumber('a', winningNumbers)).toThrow(
        ERROR_MESSAGES.INVALID_RANGE
      );
    });

    test('범위를 벗어난 경우 예외가 발생한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      expect(() => Validator.validateBonusNumber(100, winningNumbers)).toThrow(
        ERROR_MESSAGES.INVALID_RANGE
      );
    });

    test('당첨 번호와 보너스 번호가 중복되면 예외가 발생한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      expect(() => Validator.validateBonusNumber(6, winningNumbers)).toThrow(
        ERROR_MESSAGES.DUPLICATED_BONUS_NUMBER
      );
    });

    test('유효한 보너스 번호면 예외가 발생하지 않는다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      expect(() => Validator.validateBonusNumber(7, winningNumbers)).not.toThrow();
    });
  });
});
