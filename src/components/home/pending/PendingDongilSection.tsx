import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import { TStatus } from '@lib/types/TStatus';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import PendingDongilList from './PendingDongilList';

interface PendingDongilSectionProps {
  pendingDongilsStatus: TStatus;
  pendingDongilsData: IChallengeDTO[] | undefined;
}

function PendingDongilSection({
  pendingDongilsStatus,
  pendingDongilsData,
}: PendingDongilSectionProps) {
  let content;
  if (pendingDongilsStatus === 'loading') {
    content = <SkeletonDongilList variant="pending" />;
  } else if (pendingDongilsStatus === 'success') {
    if (pendingDongilsData?.length === 0) {
      content = <EmptyDongil subject="대기중인" />;
    } else {
      content = <PendingDongilList pendingDongils={pendingDongilsData!} />;
    }
  } else if (pendingDongilsStatus === 'error') {
    content = <SkeletonDongilList variant="pending" />;
  }

  return (
    <Wrapper>
      {pendingDongilsStatus !== 'idle' && <h1>대기중인 돈길</h1>}
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
