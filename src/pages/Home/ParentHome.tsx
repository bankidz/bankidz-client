import MarginTemplate from '@components/layout/MarginTemplate';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useEffect, useState } from 'react';
import LargeSpacer from '@components/layout/LargeSpacer';
import {
  fetchKids,
  selectHasMultipleKids,
  selectKids,
  selectKidsStatus,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import KidList from '@components/home/KidList';
import {
  fetchParentSummaries,
  selectParentSummaries,
  selectParentSummariesStatus,
} from '@store/slices/parentSummariesSlice';
import HomeTemplate from '@components/home/HomeTemplate';
import {
  fetchThisWeekSDongils,
  selectThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';
import EmptyDongil from '@components/home/EmptyDongil';
import ProposedDongilList from '@components/home/proposed/ProposedDongilList';
import ThisWeekSDongilList from '@components/home/thisWeekS/ThisWeekSDongilList';
import {
  fetchProposedDongils,
  selectProposedDongils,
  selectProposedDongilsStatus,
} from '@store/slices/proposedDongilsSlice';
import { theme } from '@lib/styles/theme';
import Modals from '@components/common/modals/Modals';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import SheetCompleted from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import ApproveCheck from '@components/common/bottomSheets/sheetContents/ApproveCheck';
import { dummyDongils } from '@lib/mocks/dongils';
import SkeletonDongilList from '@components/home/SkeletonDongilList';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import Summary from '@components/home/sumary/Summary';
import getParentSummaryContent from '@components/home/sumary/getParentSummaryContent';
import getProposedDongilsContent from '@components/home/proposed/getProposedDongilsContent';
import getThisWeekSDongilsContent from '@components/home/thisWeekS/getThisWeekSDongilsContent';

function ParentHome() {
  const kidsStatus = useAppSelector(selectKidsStatus);
  const kids = useAppSelector(selectKids);
  const parentSummariesStatus = useAppSelector(selectParentSummariesStatus);
  const parentSummaries = useAppSelector(selectParentSummaries);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  // when mounted
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
          (await dispatch(
            fetchParentSummaries({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
        // GET: 첫번째 자녀의 제안받은 돈길 조회
        proposedDongilsStatus === 'idle' &&
          (await dispatch(
            fetchProposedDongils({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
        // GET: 첫번째 자녀의 금주의 돈길 조희
        thisWeekSDongilsStatus === 'idle' &&
          (await dispatch(
            fetchThisWeekSDongils({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
      } catch (error: any) {
        console.log(error.message);
      }
    }
    hydrate();
  }, []);

  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);

  // 선택한 자녀에 따라 Level 업데이트
  const [colorByLevel, setColorByLevel] = useState<string>(
    theme.palette.greyScale.grey100,
  );
  useEffect(() => {
    setColorByLevel(getColorByLevel(selectedKid?.level!));
  }, [selectedKid]);

  // 제안받은 돈길 거절하기, 수락하기 (바텀시트, 모달)
  const [idToApprove, setIdToApprove] = useState<number | null>(null);
  const [openApproveCheck, onApproveCheckOpen, onApproveCheckDismiss] =
    useBottomSheet(false);
  const [
    openApproveCompleted,
    onApproveCompletedOpen,
    onApproveCompletedDismiss,
  ] = useBottomSheet(false);

  async function handleApproveButtonClick() {
    // Approve API fetch code goes here
    onApproveCheckDismiss();
    onApproveCompletedOpen();
  }

  const proposedDongils = useAppSelector(selectProposedDongils);
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);

  // 제안받은 돈길, 주간 진행상황
  let parentSummaryContent = getParentSummaryContent();
  let proposedDongilsContent = getProposedDongilsContent(
    onApproveCheckOpen,
    setIdToApprove,
  );

  // 금주의 돈길
  let thisWeekSDongilsContent = getThisWeekSDongilsContent();
  // if (proposedDongilsStatus === 'loading') {
  //   thisWeekSDongilsContent = (
  //     <>
  //       <h1>금주의 돈길</h1>
  //       <SkeletonDongilList variant="thisWeekS" />
  //     </>
  //   );
  // } else if (proposedDongilsStatus === 'succeeded') {
  //   const selectedKidSThisWeekSDongils = getSelectedKidSThisWeekSDongils(
  //     selectedKid?.username!,
  //   );
  //   if (proposedDongils?.length === 0) {
  //     thisWeekSDongilsContent = (
  //       <>
  //         <h1>금주의 돈길</h1>
  //         <EmptyDongil property="thisWeekS" />
  //       </>
  //     );
  //   } else {
  //     thisWeekSDongilsContent = (
  //       <>
  //         <h1>금주의 돈길</h1>
  //         <ThisWeekSDongilList
  //           thisWeekSDongils={selectedKidSThisWeekSDongils!}
  //         />
  //       </>
  //     );
  //   }
  // } else if (proposedDongilsStatus === 'failed') {
  //   thisWeekSDongilsContent = <p>Failed</p>;
  // }

  // function getSelectedKidSThisWeekSDongils(username: string) {
  //   const found = thisWeekSDongils?.find(
  //     (thisWeekSDongil) => thisWeekSDongil.userName === username,
  //   );
  //   return found?.challengeList;
  // }

  // 다자녀의 경우 자녀 선택에 따라 추가 조회, 이미 fetch한 경우 캐시된 데이터 사용
  const canFetchParentSummary =
    selectedKid !== null &&
    parentSummaries !== null &&
    !hasParentSummaryAlreadyBeenFetched();
  const canFetchProposedDongils =
    selectedKid !== null &&
    proposedDongils !== null &&
    !hasProposedDongilsAlreadyBeenFetched();
  const canFetchThisWeekSDongils =
    selectedKid !== null &&
    thisWeekSDongils !== null &&
    !hasThisWeekSDongilsAlreadyBeenFetched();
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
        console.log(error.message);
      }
    }
    hydrate();
  }, [selectedKid]);

  function hasParentSummaryAlreadyBeenFetched() {
    const found = parentSummaries?.find(
      (parentSummary) => parentSummary.kidId === selectedKid?.kidId,
    );
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }
  function hasProposedDongilsAlreadyBeenFetched() {
    const found = proposedDongils?.find(
      (proposedDongil) => proposedDongil.userName === selectedKid?.username,
    );
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }
  function hasThisWeekSDongilsAlreadyBeenFetched() {
    const found = thisWeekSDongils?.find(
      (thisWeekSDongil) => thisWeekSDongil.userName === selectedKid?.username,
    );
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <HomeTemplate variant="ParentHome">
        <MarginTemplate>
          <SummaryWrapper>{parentSummaryContent}</SummaryWrapper>
          <ProposedDongilsWrapper>
            {proposedDongilsContent}
          </ProposedDongilsWrapper>
          <ThisWeekSDongilWrapper>
            {thisWeekSDongilsContent}
          </ThisWeekSDongilWrapper>
          <LargeSpacer />
        </MarginTemplate>

        {/* 다음 (전역) 모달을 열고 닫는 로직은 PendingDongilItem에서 실행됩니다. */}
        <Modals />
        {/* 다음 바텀시트를 열고 닫는 로직은 pendingDongilItem에서 실행됩니다. */}
        <CommonSheet open={openApproveCheck} onDismiss={onApproveCheckDismiss}>
          <ApproveCheck
            onApproveButtonClick={handleApproveButtonClick}
            onDismiss={onApproveCheckDismiss}
          />
        </CommonSheet>
        <CommonSheet
          open={openApproveCompleted}
          onDismiss={onApproveCompletedDismiss}
        >
          <SheetCompleted
            type="approve"
            onDismiss={onApproveCompletedDismiss}
          />
        </CommonSheet>
      </HomeTemplate>
    </>
  );
}

export default ParentHome;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;

const ProposedDongilsWrapper = styled.div`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const ThisWeekSDongilWrapper = styled.div`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;
