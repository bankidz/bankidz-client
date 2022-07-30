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
} from '@store/slices/weeklyProgressSlice';
import {
  fetchWalkingMoneyRoads,
  selectWalkingMoneyRoads,
  selectWalkingMoneyRoadsStatus,
} from '@store/slices/walkingMoneyRoadsSlice';
import {
  fetchPendingMoneyRoads,
  selectPendingMoneyRoads,
  selectPendingMoneyRoadsStatus,
} from '@store/slices/pendingMoneyRoadsSlice';
import Modals from '@components/common/modals/Modals';
import Spacer from '@components/layout/Spaceholder';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import KidHomeSummary from '@components/home/KidHomeSummary';
import EmptyWalkingMoneyRoad from '@components/home/walking/EmptyWalkingMoneyRoad';
import WalkingMoneyRoadList from '@components/home/walking/WalkingMoneyRoadList';
import ContractNewMoneyRoadLink from '@components/home/walking/ContractNewMoneyRoadLink';
import EmptyPendingMoneyRoad from '@components/home/pending/EmptyPendingMoneyRoad';
import PendingMoneyRoadList from '@components/home/pending/PendingMoneyRoadList';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import DeleteCheck from '@components/common/bottomSheets/sheetContents/DeleteCheck';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import SheetComplete from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import { TFetchStatus } from '@lib/types/api';
import { TLevel } from '@lib/types/common';

function KidHome({ level }: { level: TLevel | null }) {
  //const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);

  const weeklyProgressStatus = useAppSelector(selectWeeklyProgressStatus);
  const weeklyProgress = useAppSelector(selectWeeklyProgress);
  const walkingMoneyRoadsStatus = useAppSelector(selectWalkingMoneyRoadsStatus);
  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const pendingMoneyRoadsStatus = useAppSelector(selectPendingMoneyRoadsStatus);
  const pendingMoneyRoads = useAppSelector(selectPendingMoneyRoads);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function hydrate() {
      weeklyProgressStatus === 'idle' &&
        (await dispatch(fetchWeeklyProgress({ axiosPrivate })).unwrap());
      walkingMoneyRoadsStatus === 'idle' &&
        (await dispatch(fetchWalkingMoneyRoads({ axiosPrivate })).unwrap());
      pendingMoneyRoadsStatus === 'idle' &&
        (await dispatch(fetchPendingMoneyRoads({ axiosPrivate })).unwrap());
    }
    hydrate();
  }, []);

  // 주간 진행상황
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

  // 걷고있는 돈길
  let disable = 'false';
  if (walkingMoneyRoads !== null && walkingMoneyRoads.length === 5) {
    disable = 'true';
  }
  const navigate = useNavigate();
  function handleContractNewMoneyRoadButtonClick() {
    navigate('/create/1');
  }
  let walkingMoneyRoadsContent;
  if (walkingMoneyRoadsStatus === 'loading') {
    walkingMoneyRoadsContent = <p>Loading...</p>;
  } else if (walkingMoneyRoadsStatus === 'succeeded') {
    if (walkingMoneyRoads === []) {
      walkingMoneyRoadsContent = (
        <EmptyWalkingMoneyRoad
          onClick={handleContractNewMoneyRoadButtonClick}
        />
      );
    } else {
      walkingMoneyRoadsContent = (
        <>
          <WalkingMoneyRoadList walkingMoneyRoads={walkingMoneyRoads!} />
          <ContractNewMoneyRoadLink disable={disable} to={'/create/1'} />
        </>
      );
    }
  } else if (walkingMoneyRoadsStatus === 'failed') {
    walkingMoneyRoadsContent = <p>Failed</p>;
  }

  // 대기중인 돈길 삭제
  const [deleteStatus, setDeleteStatus] = useState<TFetchStatus>('idle');
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const canDelete =
    idToDelete !== null &&
    pendingMoneyRoads !== null &&
    pendingMoneyRoads !== [] &&
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
        //   deletePendingMoneyRoad({
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
  let pendingMoneyRoadsContent;
  if (pendingMoneyRoadsStatus === 'loading') {
    pendingMoneyRoadsContent = <p>Loading...</p>;
  } else if (pendingMoneyRoadsStatus === 'succeeded') {
    if (pendingMoneyRoads === []) {
      pendingMoneyRoadsContent = <EmptyPendingMoneyRoad />;
    } else {
      pendingMoneyRoadsContent = (
        <PendingMoneyRoadList
          pendingMoneyRoads={pendingMoneyRoads!}
          onDeleteCheckOpen={onDeleteCheckOpen}
          setIdToDelete={setIdToDelete}
        />
      );
    }
  } else if (pendingMoneyRoadsStatus === 'failed') {
    pendingMoneyRoadsContent = <p>Failed</p>;
  }

  return (
    <Wrapper>
      <Content>
        <MarginTemplate>
          <div className="logo-positioner">
            <BANKIDZ />
          </div>
          <StyledHeader>{`돈길 걷는 뱅키는\n행복해요`}</StyledHeader>
          <div className="level-badge-positioner">
            <LevelBadge level={level} />
          </div>

          <div className="summary-positioner">{weeklyProgressContent}</div>
          <WalkingMoneyRoadsWrapper>
            <header>걷고있는 돈길</header>
            {walkingMoneyRoadsContent}
          </WalkingMoneyRoadsWrapper>
          <WaitingMoneyRoadWrapper>
            <header>대기중인 돈길</header>
            {pendingMoneyRoadsContent}
          </WaitingMoneyRoadWrapper>
          <Spacer />
        </MarginTemplate>

        {/* 다음 (전역) 모달을 열고 닫는 로직은 PendingMoneyRoadItem에서 실행됩니다. */}
        <Modals />
        {/* 다음 바텀시트를 열고 닫는 로직은 pendingMoneyRoadItem에서 실행됩니다. */}
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

const WalkingMoneyRoadsWrapper = styled.div`
  margin-top: 48px;

  header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const WaitingMoneyRoadWrapper = styled.div`
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
