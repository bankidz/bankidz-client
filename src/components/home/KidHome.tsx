import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import KidSummary from '@components/home/summary/KidSummary';
import WalkingDongilSection from '@components/home/walking/WalkingDongilSection';
import PendingDongilSection from '@components/home/pending/PendingDongilSection';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import challengeAPI from '@lib/apis/challenge/challengeAPI';

/**
 * 홈 페이지 최초 진입 시 주간 진행상황, 걷고있는 돈길 리스트, 대기중인 돈길 리스트를 순차적으로 fetch 합니다.
 * 이후에 홈 페이지 재 진입 시는 해당 데이터를 fetch 하지 않습니다.
 * 홈 페이지에 랜더링 되는 각 UI는 API 단위로 분할된 JSX를 반환하는 함수로 관리됩니다.
 * 해당 함수에서 반환하는 JSX는 RTK slice 내부의 fetchStatus에 따라 적절한 값으로 변화합니다.
 */
function KidHome() {
  const { status: kidSummaryStatus, data: kidSummaryData } = useQuery(
    queryKeys.CHALLENGE_PROGRESS,
    challengeAPI.getChallengeProgress,
  );
  const { status: walkingDongilsStatus, data: walkingDongilsData } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
    {
      enabled: !!kidSummaryData,
    },
  );
  const { status: pendingDongilsStatus, data: pendingDongilsData } = useQuery(
    [queryKeys.CHALLENGE, 'pending'],
    () => challengeAPI.getChallenge('pending'),
    {
      enabled: !!walkingDongilsData,
    },
  );

  return (
    <>
      <KidSummary
        kidSummaryStatus={kidSummaryStatus}
        kidSummaryData={kidSummaryData}
      />
      <WalkingDongilSection
        walkingDongilsStatus={walkingDongilsStatus}
        walkingDongilsData={walkingDongilsData}
      />
      <PendingDongilSection
        pendingDongilsStatus={pendingDongilsStatus}
        pendingDongilsData={pendingDongilsData}
      />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default KidHome;
