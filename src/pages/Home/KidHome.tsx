import MarginTemplate from '@components/layout/MarginTemplate';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import LevelBadge from '@components/common/badges/LevelBadge';
import useAxiosPrivate from '@hooks/auth/useAxiosPrivate';
import { selectLevel } from '@store/slices/authSlice';
import renderHomeBackground from '@lib/utils/common/renderHomeBackground';
import renderHomeBanki from '@lib/utils/common/renderHomeBanki';
import EmptyPendingMoneyRoad from '@components/home/kid/pendingMoneyRoad/EmptyPendingMoneyRoad';
import PendingMoneyRoadList from '@components/home/kid/pendingMoneyRoad/PendingMoneyRoadList';
import { useEffect } from 'react';
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
import Summary from '@components/home/kid/Summary';
import EmptyWalkingMoneyRoad from '@components/home/kid/walkingMoneyRoad/EmptyWalkingMoneyRoad';
import WalkingMoneyRoadList from '@components/home/kid/walkingMoneyRoad/WalkingMoneyRoadList';
import ContractNewMoneyRoadLink from '@components/home/kid/walkingMoneyRoad/ContractNewMoneyRoadLink';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import Spaceholder from '@components/layout/Spaceholder';

function KidHome() {
  const level = useAppSelector(selectLevel);
  const weeklyProgressStatus = useAppSelector(selectWeeklyProgressStatus);
  const weeklyProgress = useAppSelector(selectWeeklyProgress);
  const walkingMoneyRoadsStatus = useAppSelector(selectWalkingMoneyRoadsStatus);
  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const pendingMoneyRoadsStatus = useAppSelector(selectPendingMoneyRoadsStatus);
  const pendingMoneyRoads = useAppSelector(selectPendingMoneyRoads);

  const colorByLevel = getColorByLevel(level!);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function hydrate() {
      weeklyProgressStatus === 'idle' &&
        (await dispatch(fetchWeeklyProgress({ axiosPrivate })));
      walkingMoneyRoadsStatus === 'idle' &&
        (await dispatch(fetchWalkingMoneyRoads({ axiosPrivate })));
      pendingMoneyRoadsStatus === 'idle' &&
        (await dispatch(fetchPendingMoneyRoads({ axiosPrivate })));
    }
    hydrate();
  }, []);

  // 주간 진행상황
  let weeklyProgressContent;
  if (weeklyProgressStatus === 'loading') {
    weeklyProgressContent = <Summary current={0} goal={0} month={0} week={0} />;
  } else if (weeklyProgressStatus === 'succeeded') {
    weeklyProgressContent = (
      // TODO: to 규진) month, week은 props로 받지 말고, 컴포넌트 내부에서 자체 로직을 통해 산정하도록 수정하면 좋겠음
      // 재사용 컴포넌트의 props는 최대한 간결하게! (커플링 최소화)
      <Summary
        current={weeklyProgress!.currentSavings!}
        goal={weeklyProgress!.totalPrice!}
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
    if (walkingMoneyRoads === null) {
      walkingMoneyRoadsContent = (
        <EmptyWalkingMoneyRoad
          onClick={handleContractNewMoneyRoadButtonClick}
        />
      );
    } else {
      walkingMoneyRoadsContent = (
        <>
          <WalkingMoneyRoadList walkingMoneyRoads={walkingMoneyRoads} />
          <ContractNewMoneyRoadLink disable={disable} to={'/create/1'} />
        </>
      );
    }
  } else if (walkingMoneyRoadsStatus === 'failed') {
    walkingMoneyRoadsContent = <p>Failed</p>;
  }

  // 대기중인 돈길
  let pendingMoneyRoadsContent;
  if (pendingMoneyRoadsStatus === 'loading') {
    pendingMoneyRoadsContent = <p>Loading...</p>;
  } else if (pendingMoneyRoadsStatus === 'succeeded') {
    if (pendingMoneyRoads === null) {
      pendingMoneyRoadsContent = <EmptyPendingMoneyRoad />;
    } else {
      pendingMoneyRoadsContent = (
        <PendingMoneyRoadList pendingMoneyRoads={pendingMoneyRoads} />
      );
    }
  } else if (pendingMoneyRoadsStatus === 'failed') {
    pendingMoneyRoadsContent = <p>Failed</p>;
  }

  return (
    <Wrapper>
      <Content>
        {/* 다음 (전역) 모달을 열고 닫는 로직은 PendingMoneyRoadItem에서 처리됩니다. */}
        <Modals />
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
          <Spaceholder />
        </MarginTemplate>
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
  z-index: 100;

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
  z-index: 2;
  background-color: ${({ colorByLevel }) => colorByLevel};
`;

const HomeBackgroundPositioner = styled.div`
  z-index: 3;
  position: absolute;
  top: 48px;
  right: 0;
`;

const HomeBankiPositioner = styled.div`
  z-index: 101;
  position: absolute;
  top: 146px;
  right: 0;
`;
