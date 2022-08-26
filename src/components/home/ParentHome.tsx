import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  fetchParentSummaries,
  selectParentSummariesStatus,
} from '@store/slices/parentSummariesSlice';
import {
  fetchThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';
import {
  fetchProposedDongils,
  selectProposedDongilsStatus,
} from '@store/slices/proposedDongilsSlice';
import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import ParentSummary from '@components/home/summary/ParentSummary';
import ProposedDongilSection from '@components/home/proposed/ProposedDongilSection';
import ThisWeekSDongilSection from '@components/home/thisWeekS/ThisWeekSDongilSection';
import useIsFetched from '../../lib/hooks/useIsFetched';

// 홈 페이지 최초 진입 시 연결된 자녀 목록을 fetch 합니다.
// 그 직후 자녀 목록의 첫번째 자녀의 kidId를 통해 해당 자녀에 대한
// 주간 진행상황, 제안받는 돈길 리스트, 금주의 돈길 리스트를 fetch 합니다.
// 이후 (다자녀의 경우) 다른 자녀 선택 시 해당 자녀에 대한 상기 데이터를 fetch 합니다.
// 이후에 한 번 선택했던 자녀 재 선택시 혹은 홈 페이지 재 진입 시는 이미 fetch한 데이터를 다시 fetch 하지 않습니다.
// 홈 페이지에 랜더링 되는 각 UI는 API 단위로 분할된 JSX를 반환하는 함수로 관리됩니다.
// 해당 함수에서 반환하는 JSX는 RTK slice 내부의 fetchStatus에 따라 적절한 값으로 변화합니다.

function ParentHome() {
  const parentSummariesStatus = useAppSelector(selectParentSummariesStatus);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);
  const selectedKid = useAppSelector(selectSelectedKid);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  // 다자녀의 경우 자녀 선택에 따라 추가 조회, 이미 fetch한 경우 캐시된 데이터 사용
  const canFetchParentSummary =
    !useIsFetched('parentSummaries') &&
    parentSummariesStatus === 'succeeded' &&
    selectedKid !== null;
  const canFetchProposedDongils =
    !useIsFetched('proposedDongils') &&
    proposedDongilsStatus === 'succeeded' &&
    selectedKid !== null;
  const canFetchThisWeekSDongils =
    !useIsFetched('thisWeekSDongils') &&
    thisWeekSDongilsStatus === 'succeeded' &&
    selectedKid !== null;
  useEffect(() => {
    async function hydrate() {
      try {
        // GET: 선택한 자녀의 Summary 데이터 조회
        canFetchParentSummary &&
          (await dispatch(
            fetchParentSummaries({
              axiosPrivate,
              kidId: selectedKid.kidId,
            }),
          ).unwrap());
        // GET: 선택한 자녀의 제안받은 돈길 조회
        canFetchProposedDongils &&
          (await dispatch(
            fetchProposedDongils({
              axiosPrivate,
              kidId: selectedKid.kidId,
            }),
          ).unwrap());
        // GET: 선택한 자녀의 금주의 돈길 조희
        canFetchThisWeekSDongils &&
          (await dispatch(
            fetchThisWeekSDongils({
              axiosPrivate,
              kidId: selectedKid.kidId,
            }),
          ).unwrap());
      } catch (error: any) {
        console.log(error);
      }
    }
    hydrate();
  }, [selectedKid]);

  return (
    <>
      <ParentSummary />
      <ProposedDongilSection />
      <ThisWeekSDongilSection />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default ParentHome;
