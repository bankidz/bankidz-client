import React from 'react';
import styled, { css } from 'styled-components';
import PendingDongilItem from './dongilItems/PendingDongilItem';
import ProposedDongilItem from './dongilItems/ProposedDongilItem';
import ThisWeekSDongilItem from './dongilItems/thisWeekSDongilItem';
import WalkingDongilItem from './dongilItems/WalkingDongilItem';
import { TDongilVariant } from '@lib/types/TDongilVariant';

interface SkeletonDongilListProps {
  variant: TDongilVariant;
}

function SkeletonDongilList({ variant }: SkeletonDongilListProps) {
  const map = new Map<TDongilVariant, React.ReactElement>();
  map.set('walking', <WalkingDongilItem />);
  map.set('pending', <PendingDongilItem />);
  map.set('proposed', <ProposedDongilItem />);
  map.set('thisWeekS', <ThisWeekSDongilItem />);

  return (
    <Wrapper variant={variant}>
      <ItemWrapper variant={variant}>{map.get(variant)}</ItemWrapper>
      <ItemWrapper variant={variant}>{map.get(variant)}</ItemWrapper>
    </Wrapper>
  );
}

export default SkeletonDongilList;

const Wrapper = styled.div<{ variant: TDongilVariant }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ItemWrapper = styled.div<{ variant: TDongilVariant }>`
  background: skyblue;
  width: 100%;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};

  ${({ variant }) =>
    (variant === 'walking' || variant === 'thisWeekS') &&
    css`
      height: 54px;
      margin-bottom: 8px;
    `}
  ${({ variant }) =>
    variant === 'pending' &&
    css`
      height: 68px;
      margin-bottom: 8px;
    `}
  ${({ variant }) =>
    variant === 'proposed' &&
    css`
      height: 75px;
      margin-bottom: 8px;
    `}
`;
