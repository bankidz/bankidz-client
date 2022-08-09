import MarginTemplate from '@components/layout/MarginTemplate';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useEffect, useState } from 'react';
import {
  fetchKidSummary,
  selectKidSummary,
  selectKidSummaryStatus,
} from '@store/slices/kidSummarySlice';
import {
  fetchWalkingDongils,
  selectWalkingDongils,
  selectWalkingDongilsStatus,
} from '@store/slices/walkingDongilsSlice';
import {
  fetchPendingDongils,
  selectPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilsSlice';
import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import DeleteCheck from '@components/common/bottomSheets/sheetContents/DeleteCheck';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import SheetCompleted from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import EmptyWalkingDongil from '@components/home/walking/EmptyWalkingDongil';
import WalkingDongilList from '@components/home/walking/WalkingDongilList';
import ContractNewDongilLink from '@components/home/walking/ContractNewDongilLink';
import PendingDongilList from '@components/home/pending/PendingDongilList';
import Summary from '@components/home/Summary';
import HomeTemplate from '@components/home/HomeTemplate';
import EmptyDongil from '@components/home/EmptyDongil';
import {
  fetchFamily,
  selectParents,
  selectFamilyStatus,
} from '@store/slices/familySlice';
import SkeletonDongilList from '@components/home/SkeletonDongilList';
import getKidSummaryContent from '@components/home/getKidSummaryContent';
import getWalkingDongilContent from '@components/home/getWalkingDongilsContent';
import getWalkingDongilsContent from '@components/home/getWalkingDongilsContent';

function KidHome() {
  const kidSummary = useAppSelector(selectKidSummary);
  const kidSummaryStatus = useAppSelector(selectKidSummaryStatus);
  const walkingDongilsStatus = useAppSelector(selectWalkingDongilsStatus);
  const walkingDongils = useAppSelector(selectWalkingDongils);
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

  let kidSummaryContent = getKidSummaryContent(); // 주간 진행상황
  let walkingDongilsContent = getWalkingDongilsContent(); // 걷고있는 돈길

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

  // 대기중인 돈길
  let pendingDongilsContent;
  if (pendingDongilsStatus === 'loading') {
    pendingDongilsContent = (
      <>
        <header>대기중인 돈길</header>
        <SkeletonDongilList variant="pending" />
      </>
    );
  } else if (pendingDongilsStatus === 'succeeded') {
    if (pendingDongils?.length === 0) {
      pendingDongilsContent = (
        <>
          <header>대기중인 돈길</header>
          <EmptyDongil property="pending" />
        </>
      );
    } else {
      pendingDongilsContent = (
        <>
          <header>대기중인 돈길</header>
          <PendingDongilList
            pendingDongils={pendingDongils!}
            onDeleteCheckOpen={onDeleteCheckOpen}
            setIdToDelete={setIdToDelete}
          />
        </>
      );
    }
  } else if (pendingDongilsStatus === 'failed') {
    pendingDongilsContent = <p>Failed</p>;
  }

  return (
    <HomeTemplate variant="KidHome">
      <MarginTemplate>
        <SummaryWrapper>{kidSummaryContent}</SummaryWrapper>
        <WalkingDongilsWrapper>{walkingDongilsContent}</WalkingDongilsWrapper>
        <WaitingDongilWrapper>{pendingDongilsContent}</WaitingDongilWrapper>
        <LargeSpacer />
      </MarginTemplate>

      {/* 다음 (전역) 모달을 열고 닫는 로직은 PendingDongilItem에서 실행됩니다. */}
      <Modals />
      {/* 다음 바텀시트를 열고 닫는 로직은 pendingDongilItem에서 실행됩니다. */}
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
