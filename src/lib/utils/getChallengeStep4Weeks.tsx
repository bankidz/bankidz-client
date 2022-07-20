function getChallengeStep4Weeks(
  totalprice: number,
  weekPrice: number,
  interestRate: 10 | 20 | 30,
) {
  const alonePrice = (1 - 0.01 * interestRate) * totalprice;
  console.log(alonePrice);
  const weekCost = Math.ceil(alonePrice / weekPrice);
  //혼자 모으는 금액 + 총 이자
  const totalPriceWithInterest =
    weekPrice * weekCost + totalprice * 0.01 * interestRate;
  return { weekCost, totalPriceWithInterest };
}

export default getChallengeStep4Weeks;
