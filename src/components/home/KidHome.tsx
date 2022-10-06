import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import KidSummary from '@components/home/summary/KidSummary';
import WalkingDongilSection from '@components/home/walking/WalkingDongilSection';
import PendingDongilSection from '@components/home/pending/PendingDongilSection';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import challengeAPI from '@lib/apis/challenge/challengeAPI';

function KidHome() {
  const { status: kidSummaryStatus, data: kidSummary } = useQuery(
    queryKeys.CHALLENGE_PROGRESS,
    challengeAPI.getChallengeProgress,
  );
  const { status: walkingDongilsStatus, data: walkingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
    {
      enabled: !!kidSummary,
    },
  );
  const { status: pendingDongilsStatus, data: pendingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'pending'],
    () => challengeAPI.getChallenge('pending'),
    {
      enabled: !!walkingDongils,
    },
  );

  return (
    <>
      <KidSummary kidSummaryStatus={kidSummaryStatus} kidSummary={kidSummary} />
      <WalkingDongilSection
        walkingDongilsStatus={walkingDongilsStatus}
        walkingDongils={walkingDongils}
      />
      <PendingDongilSection
        pendingDongilsStatus={pendingDongilsStatus}
        pendingDongils={pendingDongils}
      />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default KidHome;
