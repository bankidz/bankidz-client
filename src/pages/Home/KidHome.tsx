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
} from '@store/slices/walkingDongilSlice';
import {
  fetchPendingDongils,
  selectPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilSlice';
import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import DeleteCheck from '@components/common/bottomSheets/sheetContents/DeleteCheck';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import SheetComplete from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import { TFetchStatus } from '@lib/types/api';
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

  // 주간 진행상황
  let kidSummaryContent;
  if (kidSummaryStatus === 'loading') {
    kidSummaryContent = (
      <Summary usage="KidHome" currentSavings={0} totalPrice={0} />
    );
  } else if (kidSummaryStatus === 'succeeded') {
    const { currentSavings, totalPrice } = kidSummary!;
    kidSummaryContent = (
      <Summary
        usage="KidHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
      />
    );
  } else if (kidSummaryStatus === 'failed') {
    kidSummaryContent = <p>Failed</p>;
  }

  // 걷고있는 돈길
  let disable = 'false';
  if (walkingDongils !== null && walkingDongils.length === 5) {
    disable = 'true';
  }
  const navigate = useNavigate();
  function handleContractNewDongilButtonClick() {
    navigate('/create/1');
  }
  let walkingDongilsContent;
  if (walkingDongilsStatus === 'loading') {
    walkingDongilsContent = <p>Loading...</p>;
  } else if (walkingDongilsStatus === 'succeeded') {
    if (walkingDongils === []) {
      walkingDongilsContent = (
        <EmptyWalkingDongil onClick={handleContractNewDongilButtonClick} />
      );
    } else {
      walkingDongilsContent = (
        <>
          <WalkingDongilList walkingDongils={walkingDongils!} />
          <ContractNewDongilLink disable={disable} to={'/create/1'} />
        </>
      );
    }
  } else if (walkingDongilsStatus === 'failed') {
    walkingDongilsContent = <p>Failed</p>;
  }

  // 대기중인 돈길 삭제
  const [deleteStatus, setDeleteStatus] = useState<TFetchStatus>('idle');
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const canDelete =
    idToDelete !== null &&
    pendingDongils !== null &&
    pendingDongils !== [] &&
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
    pendingDongilsContent = <p>Loading...</p>;
  } else if (pendingDongilsStatus === 'succeeded') {
    if (pendingDongils === []) {
      pendingDongilsContent = <EmptyDongil property="pending" />;
    } else {
      pendingDongilsContent = (
        <PendingDongilList
          pendingDongils={pendingDongils!}
          onDeleteCheckOpen={onDeleteCheckOpen}
          setIdToDelete={setIdToDelete}
        />
      );
    }
  } else if (pendingDongilsStatus === 'failed') {
    pendingDongilsContent = <p>Failed</p>;
  }

  return (
    <HomeTemplate usage="KidHome">
      <MarginTemplate>
        <SummaryWrapper>{kidSummaryContent}</SummaryWrapper>
        <WalkingDongilsWrapper>
          <header>걷고있는 돈길</header>
          {walkingDongilsContent}
        </WalkingDongilsWrapper>
        <WaitingDongilWrapper>
          <header>대기중인 돈길</header>
          {pendingDongilsContent}
        </WaitingDongilWrapper>
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
        <SheetComplete type="delete" onDismiss={onDeleteCompletedDismiss} />
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
  header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const WaitingDongilWrapper = styled.div`
  margin-top: 48px;
  header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;
