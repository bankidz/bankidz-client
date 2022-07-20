function getChallengeStep4Prices(totalPrice: number) {
  // 500원 단위로 올림
  const getRoundUpBy500 = (price: number) =>
    price % 500 === 0 ? price : price - (price % 500) + 500;
  const getRoundDownBy500 = (price: number) =>
    price % 500 === 0 ? price : price - (price % 500);

  const maxPrice = getRoundUpBy500(totalPrice / 1.1 / 3);
  const minPrice = getRoundDownBy500(totalPrice / 1.3 / 15);

  // 이자율 포함 전 계산식
  /*   const min =
    (totalPrice / 15) % 500 === 0
      ? totalPrice / 15
      : Math.floor(totalPrice / 15 - ((totalPrice / 15) % 500)) + 500;

  const minPrice = Math.max(500, min);
  const maxPrice =
    (totalPrice / 3) % 500 === 0
      ? totalPrice / 3
      : Math.floor(totalPrice / 3 - ((totalPrice / 3) % 500)) + 500; */

  const middlePrice =
    (minPrice + maxPrice) / 2 - (((minPrice + maxPrice) / 2) % 500);

  return { minPrice, maxPrice, middlePrice };
}

export default getChallengeStep4Prices;
