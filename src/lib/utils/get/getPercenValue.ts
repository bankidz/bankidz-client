/**
 * @param numerator : 분자
 * @param denominator : 분모
 * @returns : 퍼센트 형태의 값
 */

const getPercentValue = (numerator: number, denominator: number) => {
  return denominator === 0 ? '0' : Math.ceil((numerator / denominator) * 100);
};

export default getPercentValue;
