import { useQuery } from 'react-query';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import ParentSummary from '@components/home/summary/ParentSummary';
import ProposedDongilSection from '@components/home/proposed/ProposedDongilSection';
import ThisWeekSDongilSection from '@components/home/thisWeekS/ThisWeekSDongilSection';
import queryKeys from '@lib/constants/queryKeys';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';

function ParentHome() {
  const selectedKid = useAppSelector(selectSelectedKid);

  const { status: parentSummaryStatus, data: parentSummary } = useQuery(
    [queryKeys.CHALLENGE_KID_PROGRESS, selectedKid?.kidId],
    () => challengeAPI.getChallengeKidProgress(selectedKid!.kidId),
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
    },
  );
  const { status: proposedDongilsStatus, data: proposedDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'pending'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'pending'),
    {
      enabled: !!parentSummary,
      refetchInterval: HOME_REFETCH_INTERVAL,
    },
  );
  const { status: thisWeekSDongilsStatus, data: thisWeekSDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'walking'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'walking'),
    {
      enabled: !!proposedDongils,
      refetchInterval: HOME_REFETCH_INTERVAL,
    },
  );

  const isAllSuccess =
    parentSummaryStatus === 'success' &&
    proposedDongilsStatus === 'success' &&
    thisWeekSDongilsStatus === 'success';

  return (
    <>
      <ParentSummary
        isAllSuccess={isAllSuccess}
        parentSummary={parentSummary}
      />
      <ProposedDongilSection
        isAllSuccess={isAllSuccess}
        proposedDongils={proposedDongils}
      />
      <ThisWeekSDongilSection
        isAllSuccess={isAllSuccess}
        thisWeekSDongils={thisWeekSDongils}
      />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default ParentHome;
