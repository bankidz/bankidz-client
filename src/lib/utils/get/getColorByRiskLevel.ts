import { theme } from '@lib/styles/theme';
import { TRiskLevel } from '@lib/types/TRiskLevel';

function getColorByRiskLevel(interestRate: TRiskLevel) {
  if (interestRate === '안정') {
    return theme.palette.sementic.green300;
  } else if (interestRate === '보통') {
    return theme.palette.main.yellow300;
  } else if (interestRate === '위험') {
    return theme.palette.sementic.red300;
  }
}

export default getColorByRiskLevel;
