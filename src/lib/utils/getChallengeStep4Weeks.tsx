function getChallengeStep4Weeks(
  totalprice: number,
  weekPrice: number,
  interestRate: 10 | 20 | 30,
) {
  const weekCost = Math.floor(totalprice / weekPrice);
  const totalPriceWithInterest =
    totalprice + weekPrice * 0.01 * interestRate * weekCost;
  return { weekCost, totalPriceWithInterest };
}

export default getChallengeStep4Weeks;
