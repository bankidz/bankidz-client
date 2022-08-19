import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import HomeTemplate from '@components/home/HomeTemplate';
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
import getKidSummaryContent from '@components/home/sumary/getKidSummaryContent';
import getWalkingDongilsContent from '@components/home/walking/getWalkingDongilsContent';
import getPendingDongilsContent from '@components/home/pending/getPendingDontilsContent';

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
        console.log(error.message);
      }
    }
    hydrate();
  }, []);

  // 대기중인 돈길 삭제 (바텀시트, 모달)
  const [deleteStatus, setDeleteStatus] = useState<TFetchStatus>('idle');
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const canDelete =
    idToDelete !== null &&
    pendingDongils !== null &&
    pendingDongils.length !== 0 &&
    deleteStatus === 'idle';
  const [openDeleteCheck, onDeleteCheckOpen, onDeleteCheckDismiss] =
    useBottomSheet(false);
  const [openDeleteCompleted, onDeleteCompletedOpen, onDeleteCompletedDismiss] =
    useBottomSheet(false);
  async function handleDeleteButtonClick() {
    if (canDelete) {
      try {
        setDeleteStatus('pending');
        // await dispatch(
        //   deletePendingDongil({
        //     axiosPrivate,
        //     id: idToDelete,
        //   }),
        // ).unwrap();
        // setOpenDeleteCheck(false);
        // setOpenDeletedCompleted(true);
        onDeleteCheckOpen();
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setDeleteStatus('idle');
      }
    }
    onDeleteCheckDismiss();
    onDeleteCompletedOpen();
  }

  // 주간 진행상황, 걷고있는 돈길, 대기중인 돈길
  let kidSummaryContent = getKidSummaryContent();
  let walkingDongilsContent = getWalkingDongilsContent();
  let pendingDongilsContent = getPendingDongilsContent(
    onDeleteCheckOpen,
    setIdToDelete,
  );

  return (
    <HomeTemplate variant="KidHome">
      <MarginTemplate>
        <SummaryWrapper>{kidSummaryContent}</SummaryWrapper>
        <WalkingDongilsWrapper>{walkingDongilsContent}</WalkingDongilsWrapper>
        <WaitingDongilWrapper>{pendingDongilsContent}</WaitingDongilWrapper>
        <LargeSpacer />
      </MarginTemplate>

      {/* 다음 모달과 바텀시트를 열고 닫는 로직은 PendingDongilItem에서 실행됩니다. */}
      {/* 모달은 전역상태로 관리되기에 별도의 props를 전달하지 않습니다. */}
      <Modals />
      <CommonSheet open={openDeleteCheck} onDismiss={onDeleteCheckDismiss}>
        <DeleteCheck
          onClickDelete={handleDeleteButtonClick}
          onDismiss={onDeleteCheckDismiss}
        />
      </CommonSheet>
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

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;

const WalkingDongilsWrapper = styled.div`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const WaitingDongilWrapper = styled.div`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;
