import { theme } from '@lib/styles/theme';
import styled from 'styled-components';

type TRiskLevel = '안정' | '보통' | '위험';

interface RiskBadgeProps {
  riskLevel: TRiskLevel;
}

/**
 * @param riskLevel 위험도를 선택합니다.
 */
function RiskBadge({ riskLevel }: RiskBadgeProps) {
  const colorByRiskLevel = getColorByRiskLevel(riskLevel);
  function getColorByRiskLevel(interestRate: TRiskLevel) {
    if (interestRate === '안정') {
      return theme.palette.sementic.green300;
    } else if (interestRate === '보통') {
      return theme.palette.main.yellow300;
    } else if (interestRate === '위험') {
      return theme.palette.sementic.red300;
    }
  }

  return (
    <Wrapper colorByRiskLevel={colorByRiskLevel!}>
      <StyledSpan>{riskLevel}</StyledSpan>
    </Wrapper>
  );
}

export default RiskBadge;

const Wrapper = styled.div<{
  colorByRiskLevel: string;
}>`
  background: ${({ colorByRiskLevel }) => colorByRiskLevel};
  width: 32px;
  height: 15px;
  border-radius: ${({ theme }) => theme.radius.medium};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.span`
  ${({ theme }) => theme.typo.tag.T_8_EB}
  color: ${({ theme }) => theme.palette.greyScale.white};
`;
