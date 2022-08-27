import { TDongilVariant } from '@lib/types/TDongilVariant';
import styled, { css } from 'styled-components';
import WalkingDongilItem from './dongilItems/WalkingDongilItem';

interface SkeletonDongilListProps {
  variant: TDongilVariant;
}

function SkeletonDongilList({ variant }: SkeletonDongilListProps) {
  let content;
  if (variant === 'walking') {
    content = <WalkingDongilItem />;
  }

  return (
    <Wrapper variant={variant}>
      <ItemWrapper variant={variant}>{content}</ItemWrapper>
      <ItemWrapper variant={variant}>{content}</ItemWrapper>
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
      height: 54px;
      margin-bottom: 8px;
    `}
`;
