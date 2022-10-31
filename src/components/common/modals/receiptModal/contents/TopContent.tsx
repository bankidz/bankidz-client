import React from 'react';
import styled, { css } from 'styled-components';
import { TReceiptModalVariant } from '../TReceiptModalVariant';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import ProposalBadge from '@components/common/badges/ProposalBadge';

interface TopProps extends Pick<IChallengeDTO, 'title'> {
  variant: TReceiptModalVariant;
}

function TopContent({ variant, title }: TopProps) {
  const map = new Map<TReceiptModalVariant, React.ReactElement>();
  map.set('contract', <span className="header">계약서 전송 성공!</span>);
  map.set('proposing', <ProposalBadge isProposing />);
  map.set('rejected', <ProposalBadge isProposing={false} />);

  return (
    <Wrapper variant={variant}>
      {map.get(variant)}
      <span className="body">{title}</span>
    </Wrapper>
  );
}

export default TopContent;

const Wrapper = styled.div<{ variant: TReceiptModalVariant }>`
  ${({ variant }) =>
    variant === 'contract' &&
    css`
      height: 88px;
    `}
  ${({ variant }) =>
    variant === 'proposed' &&
    css`
      height: 88px;
    `}
  ${({ variant }) =>
    (variant === 'proposing' || variant === 'rejected') &&
    css`
      height: 116px;
    `}
  margin: -2px 0; // overlaps 2px
  background: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};

  .header {
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-bottom: 12px;
  }
  .body {
    margin-top: ${({ variant }) =>
      variant === 'proposing' || variant === 'rejected' ? '16px' : '0px'};
    ${({ theme }) => theme.typo.popup.T_24_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
`;
