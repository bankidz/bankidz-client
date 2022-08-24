import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import MarginTemplate from '@components/layout/MarginTemplate';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import {
  fetchKidSummary,
  selectKidSummaryStatus,
} from '@store/slices/kidSummarySlice';
import {
  fetchWalkingDongils,
  selectWalkingDongilsStatus,
} from '@store/slices/walkingDongilsSlice';
import {
  deletePendingDongil,
  fetchPendingDongils,
  selectPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilsSlice';
import { fetchFamily, selectFamilyStatus } from '@store/slices/familySlice';

import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import KidSummary from '@components/home/summary/KidSummary';
import WalkingDongilSection from '@components/home/walking/WalkingDongilSection';
import PendingDongilSection from '@components/home/pending/PendingDongilSection';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

// 홈 페이지 최초 진입 시 주간 진행상황, 걷고있는 돈길 리스트, 대기중인 돈길 리스트를 순차적으로 fetch 합니다.
// 이후에 홈 페이지 재 진입 시는 해당 데이터를 fetch 하지 않습니다.
// 홈 페이지에 랜더링 되는 각 UI는 API 단위로 분할된 JSX를 반환하는 함수로 관리됩니다.
// 해당 함수에서 반환하는 JSX는 RTK slice 내부의 fetchStatus에 따라 적절한 값으로 변화합니다.

function KidHome() {
  const kidSummaryStatus = useAppSelector(selectKidSummaryStatus);
  const walkingDongilsStatus = useAppSelector(selectWalkingDongilsStatus);
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const pendingDongils = useAppSelector(selectPendingDongils);
  const familyStatus = useAppSelector(selectFamilyStatus);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function hydrate() {
      try {
        kidSummaryStatus === 'idle' &&
          (await dispatch(fetchKidSummary({ axiosPrivate })).unwrap());
        walkingDongilsStatus === 'idle' &&
          (await dispatch(fetchWalkingDongils({ axiosPrivate })).unwrap());
        pendingDongilsStatus === 'idle' &&
          (await dispatch(fetchPendingDongils({ axiosPrivate })).unwrap());
        familyStatus === 'idle' &&
          (await dispatch(fetchFamily({ axiosPrivate })).unwrap());
      } catch (error: any) {
        console.log(error);
      }
    }
    hydrate();
  }, []);

  // 대기중인 돈길 삭제 (바텀시트, 모달)
  const [deletePendingDongilStatus, setDeletePendingDongilStatus] =
    useState<TFetchStatus>('idle');
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const canDeletePendingDongil =
    idToDelete !== null &&
    pendingDongils !== null &&
    pendingDongils.length !== 0 &&
    deletePendingDongilStatus === 'idle';
  const { setOpenBottomSheet, setCloseBottomSheet, openSheetBySequence } =
    useGlobalBottomSheet();

  async function handleDeleteButtonClick() {
    if (canDeletePendingDongil) {
      try {
        setDeletePendingDongilStatus('pending');
        await dispatch(
          deletePendingDongil({
            axiosPrivate,
            id: idToDelete,
          }),
        ).unwrap();
        openDeleteCheckSheet();
      } catch (error: any) {
        console.log(error);
      } finally {
        setDeletePendingDongilStatus('idle');
      }
    }
    openSheetBySequence(openDeleteCompletedSheet);
  }

  // 1. '정말로 삭제할거에요?' 바텀시트 열기
  const openDeleteCheckSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'DeleteCheck',
      sheetProps: {
        open: true,
      },
      contentProps: {
        onClickDelete: handleDeleteButtonClick,
        onDismiss: setCloseBottomSheet,
      },
    });
  };

  // 2. '삭제되었어요' 바텀시트 열기
  const openDeleteCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'SheetCompleted',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'delete',
      },
    });
  };

  return (
    <>
      <MarginTemplate>
        <KidSummary />
        <WalkingDongilSection />
        <PendingDongilSection
          onDeleteCheckOpen={openDeleteCheckSheet}
          setIdToDelete={setIdToDelete}
        />
        <LargeSpacer />
      </MarginTemplate>
      <Modals />
    </>
  );
}

export default KidHome;
