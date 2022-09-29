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

/**
 * 홈 페이지 최초 진입 시 연결된 자녀 목록을 fetch 합니다.
 * 그 직후 자녀 목록의 첫번째 자녀의 kidId를 통해 해당 자녀에 대한
 * 주간 진행상황, 제안받는 돈길 리스트, 금주의 돈길 리스트를 fetch 합니다.
 * 이후 (다자녀의 경우) 다른 자녀 선택 시 해당 자녀에 대한 상기 데이터를 fetch 합니다.
 * 이후에 한 번 선택했던 자녀 재 선택시 혹은 홈 페이지 재 진입 시는 이미 fetch한 데이터를 다시 fetch 하지 않습니다.
 * 홈 페이지에 랜더링 되는 각 UI는 API 단위로 분할된 JSX를 반환하는 함수로 관리됩니다.
 * 해당 함수에서 반환하는 JSX는 RTK slice 내부의 fetchStatus에 따라 적절한 값으로 변화합니다.
 */
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

  return (
    <>
      <ParentSummary
        parentSummaryStatus={parentSummaryStatus}
        parentSummary={parentSummary}
      />
      <ProposedDongilSection
        proposedDongilsStatus={proposedDongilsStatus}
        proposedDongils={proposedDongils}
      />
      <ThisWeekSDongilSection
        thisWeekSDongilsStatus={thisWeekSDongilsStatus}
        thisWeekSDongils={thisWeekSDongils}
      />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default ParentHome;
