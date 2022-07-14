import { useState } from 'react';

type TStackAmount = [
  number[],
  (amount: number) => void,
  () => void,
  () => void,
];

function useStackAmount(): TStackAmount {
  const [amountStack, setAmountStack] = useState<number[]>([]);

  const pushAmount = (amount: number) => {
    setAmountStack((prev) => [...prev, amount]);
  };
  const popAmount = () => {
    setAmountStack((prev) => prev.filter((v, i) => i !== prev.length - 1));
  };
  const resetAmount = () => {
    setAmountStack([]);
  };

  return [amountStack, pushAmount, popAmount, resetAmount];
}

export default useStackAmount;
