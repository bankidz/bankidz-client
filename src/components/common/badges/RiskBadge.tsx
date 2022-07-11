import styled, { css } from 'styled-components';

interface SuggestBadgeProps {
  /** 위험도를 선택합니다. '안정', '중립', '위헙' 중 하나를 입력합니다. */
  riskLevel: '안정' | '중립' | '위험';
}

function RiskBadge({ riskLevel }: SuggestBadgeProps) {
  return (
    <Wrapper riskLevel={riskLevel}>
      <StyledSpan>{riskLevel}</StyledSpan>
    </Wrapper>
  );
}

export default RiskBadge;

const Wrapper = styled.div<{
  riskLevel: '안정' | '중립' | '위험';
}>`
  width: 41px;
  height: 14px;
  border-radius: 6.56287px;

  display: flex;
  justify-content: center;
  align-items: center;

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

const StyledSpan = styled.span`
  ${({ theme }) => theme.typo.tag.T_8_EB}
  color: ${({ theme }) => theme.palette.white};
`;
