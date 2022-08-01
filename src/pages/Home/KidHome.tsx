import MarginTemplate from '@components/layout/MarginTemplate';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import LevelBadge from '@components/common/badges/LevelBadge';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { selectLevel } from '@store/slices/authSlice';
import renderHomeBackground from '@lib/utils/common/renderHomeBackground';
import renderHomeBanki from '@lib/utils/common/renderHomeBanki';
import { Children, useEffect, useState } from 'react';
import {
  fetchKidWeeklyProgress,
  selectKidWeeklyProgress,
  selectKidWeeklyProgressStatus,
} from '@store/slices/kidWeeklyProgressSlice';
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
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import DeleteCheck from '@components/common/bottomSheets/sheetContents/DeleteCheck';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import SheetComplete from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import { TFetchStatus } from '@lib/types/api';
import { TLevel } from '@lib/types/common';
import EmptyWalkingDongil from '@components/home/walking/EmptyWalkingDongil';
import WalkingDongilList from '@components/home/walking/WalkingDongilList';
import ContractNewDongilLink from '@components/home/walking/ContractNewDongilLink';
import EmptyPendingDongil from '@components/home/pending/EmptyPendingDongil';
import PendingDongilList from '@components/home/pending/PendingDongilList';
import Summary from '@components/home/Summary';
import HomeTemplate from '@components/home/HomeTemplate';

function KidHome() {
  const kidWeeklyProgress = useAppSelector(selectKidWeeklyProgress);
  const kidWeeklyProgressStatus = useAppSelector(selectKidWeeklyProgressStatus);
  const walkingDongilsStatus = useAppSelector(selectWalkingDongilsStatus);
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const pendingDongils = useAppSelector(selectPendingDongils);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function hydrate() {
      kidWeeklyProgressStatus === 'idle' &&
        (await dispatch(fetchKidWeeklyProgress({ axiosPrivate })).unwrap());
      walkingDongilsStatus === 'idle' &&
        (await dispatch(fetchWalkingDongils({ axiosPrivate })).unwrap());
      pendingDongilsStatus === 'idle' &&
        (await dispatch(fetchPendingDongils({ axiosPrivate })).unwrap());
    }
    hydrate();
  }, []);

  // 주간 진행상황;
  let kidWeeklyProgressContent;
  if (kidWeeklyProgressStatus === 'loading') {
    kidWeeklyProgressContent = (
      <Summary usage="KidHome" currentSavings={0} totalPrice={0} />
    );
  } else if (kidWeeklyProgressStatus === 'succeeded') {
    const { currentSavings, totalPrice } = kidWeeklyProgress!;
    kidWeeklyProgressContent = (
      <Summary
        usage="KidHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
      />
    );
  } else if (kidWeeklyProgressStatus === 'failed') {
    kidWeeklyProgressContent = <p>Failed</p>;
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
      pendingDongilsContent = <EmptyPendingDongil />;
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
        <SummaryWrapper>{kidWeeklyProgressContent}</SummaryWrapper>
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

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;
