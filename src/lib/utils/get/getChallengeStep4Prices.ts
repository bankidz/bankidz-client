function getChallengeStep4Prices(
  totalPrice: number,
  interestRate: 10 | 20 | 30 | null,
) {
  // 500원 단위로 올림
  const getRoundUpBy500 = (price: number) =>
    price % 500 === 0 ? price : price - (price % 500) + 500;
  const getRoundDownBy500 = (price: number) =>
    price % 500 === 0 ? price : price - (price % 500);
  // 1000원 단위로 올림
  const getRoundUpBy1000 = (price: number) =>
    price % 1000 === 0 ? price : price - (price % 1000) + 1000;
  const getRoundDownBy1000 = (price: number) =>
    price % 1000 === 0 ? price : price - (price % 1000);

  const maxPrice = interestRate
    ? getRoundUpBy500(((1 - 0.01 * interestRate) * totalPrice) / 3)
    : getRoundUpBy500((0.8 * totalPrice) / 3);
  const minPrice = interestRate
    ? getRoundUpBy500(((1 - 0.01 * interestRate) * totalPrice) / 15)
    : getRoundUpBy500((0.8 * totalPrice) / 15);

  // 20퍼센트일때 가정한 중간금액
  const middlePrice =
    (minPrice + maxPrice) / 2 - (((minPrice + maxPrice) / 2) % 500);

  return { minPrice, maxPrice, middlePrice };
}

export default getChallengeStep4Prices;
