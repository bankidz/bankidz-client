import CustomSyncLoader from '@components/common/CustomSyncLoader';
import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import NoFamily from '@components/home/NoFamily';
import ParentHome from '@components/home/ParentHome';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import familyApi from '@lib/apis/family/familyApi';
import queryKeys from '@lib/constants/queryKeys';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  fetchKids,
  selectKids,
  selectKidsStatus,
  setSelectedKid,
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
import { useQuery } from 'react-query';
import styled from 'styled-components';

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

  // const kids = useAppSelector(selectKids);
  // const hasNoFamily = kids.length === 0 && kidsStatus === 'succeeded';

  const { status, data: kids } = useQuery(
    queryKeys.FAMILY_KID,
    familyApi.getKid,
    {
      onSuccess: (data) => {
        dispatch(setSelectedKid(data[0]));
      },
    },
  );

  let content;
  if (status === 'loading') {
    content = (
      <CustomSyncLoaderWrapper>
        <CustomSyncLoader />
      </CustomSyncLoaderWrapper>
    );
  } else if (status === 'success' && kids.length === 0) {
    content = <NoFamily />;
  } else if (status === 'success') {
    content = (
      <HomeTemplate>
        <ParentHome />
      </HomeTemplate>
    );
  }

  // const { status: proposedDongilStatus, data: proposedDongilData } = useQuery(
  //   [queryKeys.CHALLENGE_KID, tempData![0].kidId],
  //   () => challengeAPI.getChallengeKid(tempData![0].kidId, 'pending'),
  //   {
  //     enabled: !!parentSummaryData,
  //   },
  // );
  // const { status: thisWeekSDongilStatus, data: thisWeekSDongilData } = useQuery(
  //   [queryKeys.CHALLENGE_KID, tempData![0].kidId],
  //   () => challengeAPI.getChallengeKid(tempData![0].kidId, 'walking'),
  //   {
  //     enabled: !!proposedDongilData,
  //   },
  // );

  // useEffect(() => {
  //   async function hydrate() {
  //     try {
  //       let response;
  //       // GET: 연결된 자녀 목록 조회
  //       if (kidsStatus === 'idle') {
  //         response = await dispatch(fetchKids({ axiosPrivate })).unwrap();
  //       }
  //       // GET: 첫번째 자녀의 Summary 데이터 조회
  //       parentSummariesStatus === 'idle' &&
  //         !hasNoFamily &&
  //         (await dispatch(
  //           fetchParentSummaries({
  //             axiosPrivate,
  //             kidId: response.data[0].kidId,
  //           }),
  //         ).unwrap());
  //       // GET: 첫번째 자녀의 제안받은 돈길 조회
  //       proposedDongilsStatus === 'idle' &&
  //         !hasNoFamily &&
  //         (await dispatch(
  //           fetchProposedDongils({
  //             axiosPrivate,
  //             kidId: response.data[0].kidId,
  //           }),
  //         ).unwrap());
  //       // GET: 첫번째 자녀의 금주의 돈길 조희
  //       thisWeekSDongilsStatus === 'idle' &&
  //         !hasNoFamily &&
  //         (await dispatch(
  //           fetchThisWeekSDongils({
  //             axiosPrivate,
  //             kidId: response.data[0].kidId,
  //           }),
  //         ).unwrap());
  //     } catch (error: any) {
  //       console.log(error);
  //     }
  //   }
  //   hydrate();
  // }, []);

  return (
    <>
      {content}
      {/* {hasNoFamily ? (
        <NoFamily />
      ) : (
        <HomeTemplate>
          <ParentHome />
        </HomeTemplate>
      )} */}
    </>
  );
}

export default ParentHomePage;

const CustomSyncLoaderWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
