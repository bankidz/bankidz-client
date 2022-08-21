import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
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
import useBottomSheet from '@lib/hooks/useBottomSheet';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import DeleteCheck from '@components/common/bottomSheets/sheetContents/DeleteCheck';
import SheetCompleted from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import KidSummary from '@components/home/sumary/KidSummary';
import WalkingDongils from '@components/home/walking/WalkingDongils';
import PendingDongils from '@components/home/pending/PendingDontils';

/*
 ** 홈 페이지 최초 진입 시 주간 진행상황, 걷고있는 돈길 리스트, 대기중인 돈길 리스트를 순차적으로 fetch 합니다.
 ** 이후에 홈 페이지 재 진입 시는 해당 데이터를 fetch 하지 않습니다.
 ** 홈 페이지에 랜더링 되는 각 UI는 API 단위로 분할된 JSX를 반환하는 함수로 관리됩니다.
 ** 해당 함수에서 반환하는 JSX는 RTK slice 내부의 fetchStatus에 따라 적절한 값으로 변화합니다.
 */

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
  const [openDeleteCheck, onDeleteCheckOpen, onDeleteCheckDismiss] =
    useBottomSheet(false);
  const [openDeleteCompleted, onDeleteCompletedOpen, onDeleteCompletedDismiss] =
    useBottomSheet(false);

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
        onDeleteCheckOpen();
      } catch (error: any) {
        console.log(error);
      } finally {
        setDeletePendingDongilStatus('idle');
      }
    }
    onDeleteCheckDismiss();
    onDeleteCompletedOpen();
  }

  return (
    <HomeTemplate variant="KidHome">
      <MarginTemplate>
        <KidSummary />
        <WalkingDongils />
        <PendingDongils
          onDeleteCheckOpen={onDeleteCheckOpen}
          setIdToDelete={setIdToDelete}
        />
        <LargeSpacer />
      </MarginTemplate>
      <Modals />

      {/* 정말로 삭제할거예요? */}
      <CommonSheet open={openDeleteCheck} onDismiss={onDeleteCheckDismiss}>
        <DeleteCheck
          onClickDelete={handleDeleteButtonClick}
          onDismiss={onDeleteCheckDismiss}
        />
      </CommonSheet>
      {/* 삭제되었어요 */}
      <CommonSheet
        open={openDeleteCompleted}
        onDismiss={onDeleteCompletedDismiss}
      >
        <SheetCompleted type="delete" onDismiss={onDeleteCompletedDismiss} />
      </CommonSheet>
    </HomeTemplate>
  );
}

export default KidHome;
