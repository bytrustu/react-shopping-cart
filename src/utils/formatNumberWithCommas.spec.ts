import { formatNumberWithCommas, insertCommasEveryThreeDigits } from '@/utils/formatNumberWithCommas.ts';

describe('formatNumberWithCommas', () => {
  test('숫자를 쉼표가 포함된 문자열로 변환한다', () => {
    expect(formatNumberWithCommas(1234)).toBe('1,234');
    expect(formatNumberWithCommas(1000000)).toBe('1,000,000');
    expect(formatNumberWithCommas(9876543210)).toBe('9,876,543,210');
  });

  test('숫자가 3자리 미만이면 쉼표를 추가하지 않는다', () => {
    expect(formatNumberWithCommas(0)).toBe('0');
    expect(formatNumberWithCommas(12)).toBe('12');
    expect(formatNumberWithCommas(345)).toBe('345');
  });

  test('음수도 쉼표를 추가하여 변환한다', () => {
    expect(formatNumberWithCommas(-1234)).toBe('-1,234');
    expect(formatNumberWithCommas(-9876543210)).toBe('-9,876,543,210');
  });
});

describe('insertCommasEveryThreeDigits', () => {
  test('숫자 배열에 3자리마다 쉼표를 삽입한다', () => {
    expect(insertCommasEveryThreeDigits(['1', '2', '3', '4'].reverse())).toEqual(['1', ',', '2', '3', '4'].reverse());
    expect(insertCommasEveryThreeDigits(['1', '2', '3', '4', '5', '6', '7'].reverse())).toEqual(
      ['1', ',', '2', '3', '4', ',', '5', '6', '7'].reverse(),
    );
  });

  test('숫자 배열의 길이가 3 이하이면 쉼표를 삽입하지 않는다', () => {
    expect(insertCommasEveryThreeDigits(['1'])).toEqual(['1']);
    expect(insertCommasEveryThreeDigits(['1', '2'])).toEqual(['1', '2']);
    expect(insertCommasEveryThreeDigits(['1', '2', '3'])).toEqual(['1', '2', '3']);
  });

  test('빈 배열이 주어지면 빈 배열을 반환한다', () => {
    expect(insertCommasEveryThreeDigits([])).toEqual([]);
  });
});
