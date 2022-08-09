import { theme } from '@lib/styles/theme';
import { TInterestRate } from '@lib/types/common';

function getColorByInterestRate(interestRate: TInterestRate) {
  if (interestRate === 10) {
    return theme.palette.sementic.green300;
  } else if (interestRate === 20) {
    return theme.palette.main.yellow300;
  } else if (interestRate === 30) {
    return theme.palette.sementic.red300;
  }
}

export default getColorByInterestRate;
