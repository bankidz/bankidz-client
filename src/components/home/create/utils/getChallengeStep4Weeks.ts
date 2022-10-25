function getChallengeStep4Weeks(
  totalPrice: number,
  weekPrice: number,
  interestRate: 10 | 20 | 30,
) {
  const weekCost = Math.ceil(
    (totalPrice - totalPrice * 0.01 * interestRate) / weekPrice,
  );
  const totalPriceWithInterest =
    weekPrice * weekCost + totalPrice * 0.01 * interestRate;
  return { weekCost, totalPriceWithInterest };
}

export default getChallengeStep4Weeks;
