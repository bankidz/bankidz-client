function getChallengeStep4Prices(totalPrice: number) {
  const min =
    (totalPrice / 15) % 500 === 0
      ? totalPrice / 15
      : Math.floor(totalPrice / 15 - ((totalPrice / 15) % 500)) + 500;

  const minPrice = Math.max(500, min);
  const maxPrice =
    (totalPrice / 3) % 500 === 0
      ? totalPrice / 3
      : Math.floor(totalPrice / 3 - ((totalPrice / 3) % 500)) + 500;

  const middlePrice =
    (minPrice + maxPrice) / 2 - (((minPrice + maxPrice) / 2) % 500);

  return { minPrice, maxPrice, middlePrice };
}

export default getChallengeStep4Prices;
