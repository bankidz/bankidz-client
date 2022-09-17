import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import {
  fetchKidSummary,
  selectKidSummaryStatus,
} from '@store/slices/kidSummarySlice';
import {
  fetchWalkingDongils,
  selectWalkingDongilsStatus,
} from '@store/slices/walkingDongilsSlice';
import {
  fetchPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilsSlice';
import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import KidSummary from '@components/home/summary/KidSummary';
import WalkingDongilSection from '@components/home/walking/WalkingDongilSection';
import PendingDongilSection from '@components/home/pending/PendingDongilSection';
import { useQueries } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import challengeAPI from '@lib/apis/challenge/challengeAPI';

/**
 * 홈 페이지 최초 진입 시 주간 진행상황, 걷고있는 돈길 리스트, 대기중인 돈길 리스트를 순차적으로 fetch 합니다.
 * 이후에 홈 페이지 재 진입 시는 해당 데이터를 fetch 하지 않습니다.
 * 홈 페이지에 랜더링 되는 각 UI는 API 단위로 분할된 JSX를 반환하는 함수로 관리됩니다.
 * 해당 함수에서 반환하는 JSX는 RTK slice 내부의 fetchStatus에 따라 적절한 값으로 변화합니다.
 */
function KidHome() {
  const kidSummaryStatus = useAppSelector(selectKidSummaryStatus);
  const walkingDongilsStatus = useAppSelector(selectWalkingDongilsStatus);
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const result = useQueries([
    {
      queryKey: queryKeys.KID_SUMMARY,
      queryFn: () => challengeAPI.getChallengeProgress(),
    },
    {
      queryKey: queryKeys.WALKING_DONGILS,
      queryFn: () => challengeAPI.getChallenge('walking'),
    },
    {
      queryKey: queryKeys.PENDING_DONGILS,
      queryFn: () => challengeAPI.getChallenge('pending'),
    },
  ]);

  useEffect(() => {
    // console.log('qB:', result);
    // const loadingFinishAll = result.some((result) => result.isLoading);
    // console.log('lFA:', loadingFinishAll);
    async function hydrate() {
      try {
        kidSummaryStatus === 'idle' &&
          (await dispatch(fetchKidSummary({ axiosPrivate })).unwrap());
        walkingDongilsStatus === 'idle' &&
          (await dispatch(fetchWalkingDongils({ axiosPrivate })).unwrap());
        pendingDongilsStatus === 'idle' &&
          (await dispatch(fetchPendingDongils({ axiosPrivate })).unwrap());
      } catch (error: any) {
        console.log(error);
      }
    }
    hydrate();
  }, []);

  return (
    <>
      <KidSummary />
      <WalkingDongilSection />
      <PendingDongilSection />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default KidHome;
