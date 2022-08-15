import styled, { css } from 'styled-components';

interface ProposalBadgeProps {
  /** 상태를 선택합니다. isProposing이 true면 '제안중', false면 '거절됨'을 의미합니다. */
  isProposing: boolean;
}

function ProposalBadge({ isProposing }: ProposalBadgeProps) {
  return (
    <Wrapper isProposing={isProposing}>
      {isProposing ? '제안중' : '거절됨'}
    </Wrapper>
  );
}

export default ProposalBadge;

const Wrapper = styled.div<{ isProposing: boolean }>`
  height: 26px;
  width: 67px;
  border-radius: ${({ theme }) => theme.radius.small};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.typo.button.InnerText_T_12_EB}
  color: ${({ theme, isProposing }) =>
    isProposing
      ? theme.palette.greyScale.grey600
      : theme.palette.sementic.red300};
  background-color: ${({ theme, isProposing }) =>
    isProposing
      ? theme.palette.greyScale.grey200
      : theme.palette.sementic.red100};
`;
