import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import KidSummary from '@components/home/summary/KidSummary';
import WalkingDongilSection from '@components/home/walking/WalkingDongilSection';
import PendingDongilSection from '@components/home/pending/PendingDongilSection';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';

function KidHome() {
  const { status: kidSummaryStatus, data: kidSummary } = useQuery(
    queryKeys.CHALLENGE_PROGRESS,
    challengeAPI.getChallengeProgress,
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
    },
  );
  const { status: walkingDongilsStatus, data: walkingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
    {
      enabled: !!kidSummary,
      refetchInterval: HOME_REFETCH_INTERVAL,
    },
  );
  const { status: pendingDongilsStatus, data: pendingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'pending'],
    () => challengeAPI.getChallenge('pending'),
    {
      enabled: !!walkingDongils,
      refetchInterval: HOME_REFETCH_INTERVAL,
    },
  );

  const isAllSuccess =
    kidSummaryStatus === 'success' &&
    walkingDongilsStatus === 'success' &&
    pendingDongilsStatus === 'success';

  return (
    <>
      <KidSummary isAllSuccess={isAllSuccess} kidSummary={kidSummary} />
      <WalkingDongilSection
        isAllSuccess={isAllSuccess}
        walkingDongils={walkingDongils}
      />
      <PendingDongilSection
        isAllSuccess={isAllSuccess}
        pendingDongils={pendingDongils}
      />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default KidHome;
