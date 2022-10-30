import React from 'react';
import {
  ReactComponent as BankiWalk10,
  ReactComponent as BankiWalk20,
  ReactComponent as BankiWalk30,
} from '@assets/illusts/banki/banki_walk_10.svg';
import { TInterestRate } from '@lib/types/IInterestRate';

function renderBankiWalk(interestRate: TInterestRate) {
  const map = new Map<TInterestRate, React.ReactElement>();
  map.set(10, <BankiWalk10 />);
  map.set(20, <BankiWalk20 />);
  map.set(30, <BankiWalk30 />);
  return map.get(interestRate);
}

export default renderBankiWalk;
