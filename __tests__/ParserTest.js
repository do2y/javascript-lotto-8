import Parser from "../src/utils/Parser";

describe("Parser 클래스 테스트", () => {
  describe("parseLottoNumbers()", () => {
    test("쉼표(,)로 구분된 숫자 문자열을 배열로 변환한다.", () => {
      const input = "1,2,3,4,5,6";
      const result = Parser.parseLottoNumbers(input);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("공백이 포함된 입력을 정상적으로 처리한다.", () => {
      const input = " 1,  2 ,3 , 4,5,6 ";
      const result = Parser.parseLottoNumbers(input);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
