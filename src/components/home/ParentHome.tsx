import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import {
  fetchKids,
  selectKidsStatus,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import {
  fetchParentSummaries,
  selectParentSummariesStatus,
} from '@store/slices/parentSummariesSlice';
import {
  appendThisWeekSDongil,
  fetchThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';
import {
  approveProposedDongil,
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
import LargeSpacer from '@components/layout/LargeSpacer';
import MarginTemplate from '@components/layout/MarginTemplate';

import getColorByLevel from '@lib/utils/get/getColorByLevel';
import hasParentSummaryAlreadyBeenFetched from '@components/home/sumary/hasParentSummaryAlreadyBeenFetched';
import hasProposedDongilsAlreadyBeenFetched from '@components/home/proposed/hasProposedDongilsAlreadyBeenFetched';
import hasThisWeekSDongilsAlreadyBeenFetched from '@components/home/thisWeekS/hasThisWeekSDongilsAlreadyBeenFetched';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import ParentSummary from '@components/home/sumary/ParentSummary';
import ProposedDongilSection from '@components/home/proposed/ProposedDongilSection';
import ThisWeekSDongilSection from '@components/home/thisWeekS/ThisWeekSDongilSection';

/*
 ** 홈 페이지 최초 진입 시 연결된 자녀 목록을 fetch 합니다.
 ** 그 직후 자녀 목록의 첫번째 자녀의 kidId를 통해 해당 자녀에 대한
 ** 주간 진행상황, 제안받는 돈길 리스트, 금주의 돈길 리스트를 fetch 합니다.
 ** 이후 (다자녀의 경우) 다른 자녀 선택 시 해당 자녀에 대한 상기 데이터를 fetch 합니다.
 ** 이후에 한 번 선택했던 자녀 재 선택시 혹은 홈 페이지 재 진입 시는 이미 fetch한 데이터를 다시 fetch 하지 않습니다.
 ** 홈 페이지에 랜더링 되는 각 UI는 API 단위로 분할된 JSX를 반환하는 함수로 관리됩니다.
 ** 해당 함수에서 반환하는 JSX는 RTK slice 내부의 fetchStatus에 따라 적절한 값으로 변화합니다.
 */

function ParentHome() {
  const kidsStatus = useAppSelector(selectKidsStatus);
  const parentSummariesStatus = useAppSelector(selectParentSummariesStatus);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);
  const selectedKid = useAppSelector(selectSelectedKid);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

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
        console.log(error);
      }
    }
    hydrate();
  }, []);

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
  const [approveProposedDongilStatus, setApproveProposedDongilStatus] =
    useState<TFetchStatus>('idle');
  const canApproveProposedDongil =
    approveProposedDongilStatus === 'idle' &&
    idToApprove !== null &&
    selectedKid !== null;
  const proposedDongils = useAppSelector(selectProposedDongils);

  async function handleApproveButtonClick() {
    if (canApproveProposedDongil) {
      try {
        setApproveProposedDongilStatus('pending');
        await dispatch(
          approveProposedDongil({
            axiosPrivate,
            idToApprove,
            isApprove: true,
          }),
        ).unwrap();

        const getApprovedDongil = (idToApprove: number) => {
          let found;
          proposedDongils.map((proposedDongil) => {
            found = proposedDongil.challengeList.find(
              (challenge) => challenge.id === idToApprove,
            );
          });
          return found;
        };
        const approvedDongil = getApprovedDongil(idToApprove)!;
        dispatch(appendThisWeekSDongil({ selectedKid, approvedDongil }));

        onApproveCheckDismiss();
        onApproveCompletedOpen();
      } catch (error) {
        console.log(error);
      } finally {
        setApproveProposedDongilStatus('idle');
      }
    }
  }

  // 다자녀의 경우 자녀 선택에 따라 추가 조회, 이미 fetch한 경우 캐시된 데이터 사용
  const canFetchParentSummary =
    !hasParentSummaryAlreadyBeenFetched() &&
    parentSummariesStatus === 'succeeded' &&
    selectedKid !== null;
  const canFetchProposedDongils =
    !hasProposedDongilsAlreadyBeenFetched() &&
    proposedDongilsStatus === 'succeeded' &&
    selectedKid !== null;
  const canFetchThisWeekSDongils =
    !hasThisWeekSDongilsAlreadyBeenFetched() &&
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
      <MarginTemplate>
        <ParentSummary />
        <ProposedDongilSection
          onApproveCheckOpen={onApproveCheckOpen}
          setIdToApprove={setIdToApprove}
        />
        <ThisWeekSDongilSection />
        <LargeSpacer />
      </MarginTemplate>
      <Modals />

      {/* 자녀의 돈길을 수락할까요? */}
      <CommonSheet open={openApproveCheck} onDismiss={onApproveCheckDismiss}>
        <ApproveCheck
          onApproveButtonClick={handleApproveButtonClick}
          onDismiss={onApproveCheckDismiss}
        />
      </CommonSheet>
      {/* 자녀의 돈길이 수락되었어요 */}
      <CommonSheet
        open={openApproveCompleted}
        onDismiss={onApproveCompletedDismiss}
      >
        <SheetCompleted type="approve" onDismiss={onApproveCompletedDismiss} />
      </CommonSheet>
    </>
  );
}

export default ParentHome;
