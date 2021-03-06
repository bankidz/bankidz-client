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
import { useEffect, useState } from 'react';
import {
  fetchWeeklyProgress,
  selectWeeklyProgress,
  selectWeeklyProgressStatus,
} from '@store/slices/weeklyDongilSlice';
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
import Spacer from '@components/layout/Spaceholder';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import DeleteCheck from '@components/common/bottomSheets/sheetContents/DeleteCheck';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import SheetComplete from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import { TFetchStatus } from '@lib/types/api';
import { TLevel } from '@lib/types/common';
import KidHomeSummary from '@components/home/KidHomeSummary';
import EmptyWalkingDongil from '@components/home/walking/EmptyWalkingDongil';
import WalkingDongilList from '@components/home/walking/WalkingDongilList';
import ContractNewDongilLink from '@components/home/walking/ContractNewDongilLink';
import EmptyPendingDongil from '@components/home/pending/EmptyPendingDongil';
import PendingDongilList from '@components/home/pending/PendingDongilList';

function KidHome({ level }: { level: TLevel }) {
  // const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);

  const weeklyProgressStatus = useAppSelector(selectWeeklyProgressStatus);
  const weeklyProgress = useAppSelector(selectWeeklyProgress);
  const walkingDongilsStatus = useAppSelector(selectWalkingDongilsStatus);
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const pendingDongils = useAppSelector(selectPendingDongils);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function hydrate() {
      weeklyProgressStatus === 'idle' &&
        (await dispatch(fetchWeeklyProgress({ axiosPrivate })).unwrap());
      walkingDongilsStatus === 'idle' &&
        (await dispatch(fetchWalkingDongils({ axiosPrivate })).unwrap());
      pendingDongilsStatus === 'idle' &&
        (await dispatch(fetchPendingDongils({ axiosPrivate })).unwrap());
    }
    hydrate();
  }, []);

  // ?????? ????????????;
  let weeklyProgressContent;
  if (weeklyProgressStatus === 'loading') {
    weeklyProgressContent = (
      <KidHomeSummary current={0} goal={0} month={0} week={0} />
    );
  } else if (weeklyProgressStatus === 'succeeded') {
    weeklyProgressContent = (
      <KidHomeSummary
        current={weeklyProgress?.currentSavings!}
        goal={weeklyProgress?.totalPrice!}
        month={6}
        week={4}
      />
    );
  } else if (weeklyProgressStatus === 'failed') {
    weeklyProgressContent = <p>Failed</p>;
  }

  // ???????????? ??????
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

  // ???????????? ?????? ??????
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

  // ???????????? ??????
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
    <Wrapper>
      <Content>
        <MarginTemplate>
          <div className="logo-positioner">
            <BANKIDZ />
          </div>
          <StyledHeader>{`?????? ?????? ?????????\n????????????`}</StyledHeader>
          <div className="level-badge-positioner">
            <LevelBadge level={level} />
          </div>

          <div className="summary-positioner">{weeklyProgressContent}</div>
          <WalkingDongilsWrapper>
            <header>???????????? ??????</header>
            {walkingDongilsContent}
          </WalkingDongilsWrapper>
          <WaitingDongilWrapper>
            <header>???????????? ??????</header>
            {pendingDongilsContent}
          </WaitingDongilWrapper>
          <Spacer />
        </MarginTemplate>

        {/* ?????? (??????) ????????? ?????? ?????? ????????? PendingDongilItem?????? ???????????????. */}
        <Modals />
        {/* ?????? ??????????????? ?????? ?????? ????????? pendingDongilItem?????? ???????????????. */}
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
      </Content>

      {/* absolutely positioned background components */}
      <BackgroundBox colorByLevel={colorByLevel} />
      <BackgroundEllipse colorByLevel={colorByLevel} />
      <HomeBackgroundPositioner>
        {renderHomeBackground(level!)}
      </HomeBackgroundPositioner>
      <HomeBankiPositioner>{renderHomeBanki(level!)}</HomeBankiPositioner>
    </Wrapper>
  );
}

export default KidHome;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  position: absolute;
  z-index: 2;

  .logo-positioner {
    width: 100.24px;
    height: 15.82px;
    margin-top: 17.73px;
    margin-left: 3.79px;
  }
  .level-badge-positioner {
    margin-top: 24px;
    margin-left: 10px;
  }
  .summary-positioner {
    height: 120px;
    margin-top: 198px;
    width: 100%;
  }
`;

const StyledHeader = styled.header`
  margin-top: 30.44px;
  margin-left: 10px;
  width: 308px;
  height: 58px;
  white-space: pre-line;

  ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
  color: ${({ theme }) => theme.palette.greyScale.white};
  line-height: 150%;
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

// absolutely positioned background components
const BackgroundBox = styled.div<{ colorByLevel: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  width: 100%;
  height: 393px;
  z-index: 1;
  background-color: ${({ colorByLevel }) => colorByLevel};
`;

const BackgroundEllipse = styled.div<{ colorByLevel: string }>`
  position: absolute;
  top: 337px;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  width: 530px;
  height: 230px;
  border-radius: 265px / 115px;
  z-index: 1;
  background-color: ${({ colorByLevel }) => colorByLevel};
`;

const HomeBackgroundPositioner = styled.div`
  z-index: 1;
  position: absolute;
  top: 48px;
  right: 0;
`;

const HomeBankiPositioner = styled.div`
  z-index: 3;
  position: absolute;
  top: 146px;
  right: 0;
`;
