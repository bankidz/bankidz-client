import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import NoFamily from '@components/home/NoFamily';
import ParentHome from '@components/home/ParentHome';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  fetchKids,
  selectKids,
  selectKidsStatus,
} from '@store/slices/kidsSlice';
import {
  fetchParentSummaries,
  selectParentSummariesStatus,
} from '@store/slices/parentSummariesSlice';
import {
  fetchProposedDongils,
  selectProposedDongilsStatus,
} from '@store/slices/proposedDongilsSlice';
import {
  fetchThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';
import { useEffect } from 'react';

// 부모홈의 계층 구조는 다음과 같습니다.
// 1. ParentHomePage: 연결된 자녀, 첫번째 자녀 데이터 fetch
// 2. 연결된 가족이 없는 경우 - NoFamily
// 2. 연결된 가족이 있는 경우 - HomeTemplate: FixedBar, Background 랜더링
// 3. ParentHome: FixedBar, Background 제외 UI 요소 랜더링,
// 선택한 자녀 데이터 추가 fetch 및 caching

function ParentHomePage() {
  usePreventGoBack();
  const kidsStatus = useAppSelector(selectKidsStatus);
  const parentSummariesStatus = useAppSelector(selectParentSummariesStatus);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const kids = useAppSelector(selectKids);
  const hasNoFamily = kids.length === 0 && kidsStatus === 'succeeded';

  useEffect(() => {
    async function hydrate() {
      try {
        let response;
        // GET: 연결된 자녀 목록 조회
        if (kidsStatus === 'idle') {
          response = await dispatch(fetchKids({ axiosPrivate })).unwrap();
        }
        // GET: 첫번째 자녀의 Summary 데이터 조회
        parentSummariesStatus === 'idle' &&
          !hasNoFamily &&
          (await dispatch(
            fetchParentSummaries({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
        // GET: 첫번째 자녀의 제안받은 돈길 조회
        proposedDongilsStatus === 'idle' &&
          !hasNoFamily &&
          (await dispatch(
            fetchProposedDongils({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
        // GET: 첫번째 자녀의 금주의 돈길 조희
        thisWeekSDongilsStatus === 'idle' &&
          !hasNoFamily &&
          (await dispatch(
            fetchThisWeekSDongils({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
      } catch (error: any) {
        console.log(error);
      }
    }
    hydrate();
  }, []);

  return (
    <>
      {hasNoFamily ? (
        <NoFamily />
      ) : (
        <HomeTemplate>
          <ParentHome />
        </HomeTemplate>
      )}
    </>
  );
}

export default ParentHomePage;
