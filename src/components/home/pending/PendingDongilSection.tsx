import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import { TStatus } from '@lib/types/TStatus';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import PendingDongilList from './PendingDongilList';

interface PendingDongilSectionProps {
  isAllSuccess: boolean;
  pendingDongils: IChallengeDTO[] | undefined;
}

function PendingDongilSection({
  isAllSuccess,
  pendingDongils,
}: PendingDongilSectionProps) {
  let content;
  if (isAllSuccess) {
    if (pendingDongils?.length === 0) {
      content = <EmptyDongil subject="대기중인" />;
    } else {
      content = <PendingDongilList pendingDongils={pendingDongils!} />;
    }
  } else {
    content = <SkeletonDongilList variant="pending" />;
  }

  return (
    <Wrapper>
      <h1>대기중인 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default PendingDongilSection;

const Wrapper = styled.section`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;
