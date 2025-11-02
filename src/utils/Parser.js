export default class Parser {
  static parseLottoNumbers(input) {
    return input.split(',').map((num) => Number(num.trim()));
  }
}
