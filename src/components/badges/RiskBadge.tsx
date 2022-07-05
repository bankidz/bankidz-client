import styled, { css } from 'styled-components';

interface SuggestBadgeProps {
  /** 위험도를 선택합니다. '안정', '중립', '위헙' 중 하나를 입력합니다. */
  riskLevel: '안정' | '중립' | '위험';
}

function RiskBadge({ riskLevel }: SuggestBadgeProps) {
  return (
    <ComponentWrapper>
      <StyledSpan riskLevel={riskLevel}>{riskLevel}</StyledSpan>
    </ComponentWrapper>
  );
}

export default RiskBadge;

const ComponentWrapper = styled.div`
  height: 19.69px;
`;

const StyledSpan = styled.span<{
  riskLevel: '안정' | '중립' | '위험';
}>`
  width: 41.02px;
  height: 19.69px;
  border-radius: 6.56287px;

  font-style: normal;
  font-weight: 700;
  font-size: 9.84431px;
  line-height: 12px;
  color: white;

  line-height: 19.69px;
  vertical-align: middle;
  display: inline-block;
  text-align: center;

  ${({ riskLevel }) =>
    riskLevel === '안정' &&
    css`
      background: ${({ theme }) => theme.palette.green[3]};
    `}
  ${({ riskLevel }) =>
    riskLevel === '중립' &&
    css`
      background: ${({ theme }) => theme.palette.yellow[3]};
    `}
  ${({ riskLevel }) =>
    riskLevel === '위험' &&
    css`
      background: ${({ theme }) => theme.palette.red[3]};
    `}
`;
