import styled, { css } from 'styled-components';

interface RiskBadgeProps {
  /** 위험도를 선택합니다. */
  riskLevel: '안정' | '보통' | '위험';
}

function RiskBadge({ riskLevel }: RiskBadgeProps) {
  return (
    <Wrapper riskLevel={riskLevel}>
      <StyledSpan>{riskLevel}</StyledSpan>
    </Wrapper>
  );
}

export default RiskBadge;

const Wrapper = styled.div<{
  riskLevel: '안정' | '보통' | '위험';
}>`
  width: 32px;
  height: 15px;
  border-radius: ${({ theme }) => theme.radius.medium};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ riskLevel }) =>
    riskLevel === '안정' &&
    css`
      background: ${({ theme }) => theme.palette.sementic.green300};
    `}
  ${({ riskLevel }) =>
    riskLevel === '보통' &&
    css`
      background: ${({ theme }) => theme.palette.main.yellow400};
    `}
  ${({ riskLevel }) =>
    riskLevel === '위험' &&
    css`
      background: ${({ theme }) => theme.palette.sementic.red300};
    `}
`;

const StyledSpan = styled.span`
  ${({ theme }) => theme.typo.tag.T_8_EB}
  color: ${({ theme }) => theme.palette.greyScale.white};
`;
