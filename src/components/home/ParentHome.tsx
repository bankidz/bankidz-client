import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { selectSelectedKid } from '@store/slices/kidsSlice';
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

import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';

import { TFetchStatus } from '@lib/types/TFetchStatus';
import ParentSummary from '@components/home/summary/ParentSummary';
import ProposedDongilSection from '@components/home/proposed/ProposedDongilSection';
import ThisWeekSDongilSection from '@components/home/thisWeekS/ThisWeekSDongilSection';
import useIsFetched from '../../lib/hooks/useIsFetched';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

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

  // 제안받은 돈길 거절하기, 수락하기 (바텀시트, 모달)
  const [idToApprove, setIdToApprove] = useState<number>(-1); // -1: initial flag value
  const {
    isOpen,
    setOpenBottomSheet,
    setCloseBottomSheet,
    openSheetBySequence,
  } = useGlobalBottomSheet();
  const [approveProposedDongilStatus, setApproveProposedDongilStatus] =
    useState<TFetchStatus>('idle');
  const canApproveProposedDongil =
    approveProposedDongilStatus === 'idle' &&
    idToApprove !== -1 &&
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
        openApproveCompletedSheet();
      } catch (error) {
        console.log(error);
      } finally {
        setApproveProposedDongilStatus('idle');
      }
    }
  }

  // 수락하기 바텀시트 열기
  const openApproveCheckSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: { open: true },
      contentProps: {
        type: 'approve',
        onMainActionClick: handleApproveButtonClick,
        onDismiss: setCloseBottomSheet,
      },
    });
  };

  // 수락 완료 바텀시트 열기
  const openApproveCompletedSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Completed',
        sheetProps: { open: true },
        contentProps: {
          type: 'approve',
          onDismiss: setCloseBottomSheet,
        },
      });
    openSheetBySequence(openSheet);
  };

  return (
    <>
      <ParentSummary />
      <ProposedDongilSection
        onApproveCheckOpen={openApproveCheckSheet}
        setIdToApprove={setIdToApprove}
      />
      <ThisWeekSDongilSection />
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default ParentHome;
