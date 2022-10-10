import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import ParentSummary from '@components/home/summary/ParentSummary';
import ProposedDongilSection from '@components/home/proposed/ProposedDongilSection';
import ThisWeekSDongilSection from '@components/home/thisWeekS/ThisWeekSDongilSection';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import challengeAPI from '@lib/apis/challenge/challengeAPI';

function ParentHome() {
  const selectedKid = useAppSelector(selectSelectedKid);

  const { status: parentSummaryStatus, data: parentSummary } = useQuery(
    [queryKeys.CHALLENGE_KID_PROGRESS, selectedKid?.kidId],
    () => challengeAPI.getChallengeKidProgress(selectedKid!.kidId),
  );
  const { status: proposedDongilsStatus, data: proposedDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'pending'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'pending'),
    {
      enabled: !!parentSummary,
    },
  );
  const { status: thisWeekSDongilsStatus, data: thisWeekSDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'walking'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'walking'),
    {
      enabled: !!proposedDongils,
    },
  );

  const isAllSuccess =
    parentSummaryStatus === 'success' &&
    proposedDongilsStatus === 'success' &&
    thisWeekSDongilsStatus === 'success';

  return (
    <>
      <ParentSummary
        parentSummary={parentSummary}
        isAllSuccess={isAllSuccess}
      />
      <ProposedDongilSection
        proposedDongils={proposedDongils}
        isAllSuccess={isAllSuccess}
      />
      <ThisWeekSDongilSection
        thisWeekSDongils={thisWeekSDongils}
        isAllSuccess={isAllSuccess}
      />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default ParentHome;
