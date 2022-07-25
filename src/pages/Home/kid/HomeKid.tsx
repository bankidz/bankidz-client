import MarginTemplate from '@components/layout/MarginTemplate';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as BANKIDZ } from '@assets/icon/BANKIDZ.svg';
import LevelBadge from '@components/common/badges/LevelBadge';
import Summary from '@components/kid/home/Summary';
import { TLevel } from '@lib/types/common';
import { renderHomeBackground } from '@lib/utils/common/renderHomeBackground';
import { renderHomeBanki } from '@lib/utils/common/renderHomeBanki';
import EmptyWalkingMoneyRoad from '@components/kid/home/WalkingMoneyRoad/EmptyWalkingMoneyRoad';
import WalkingMoneyRoadList from '@components/kid/home/WalkingMoneyRoad/WalkingMoneyRoadList';
import ContractNewMoneyRoadButton from '@components/kid/home/WalkingMoneyRoad/ContractNewMoneyRoadButton';
import EmptyWaitingMoneyRoad from '@components/kid/home/WaitingMoneyRoad/EmptyWaitingMoneyRoad';
import WaitingMoneyRoadList from '@components/kid/home/WaitingMoneyRoad/WaitingMoneyRoadList';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  fetchWalkingMoneyRoad,
  selectWalkingMoneyRoad,
  selectWalkingMoneyRoadRequestStatus,
} from '@store/slices/walkingMoneyRoadSlice';
import { TRequestStatus } from '@lib/types/api';
import useAxiosPrivate from '@hooks/auth/useAxiosPrivate';
import { useEffect } from 'react';

function HomeKid() {
  const navigate = useNavigate();
  const level = 3;

  const isEmpty = false;
  const disable = false;

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  // TODO: useEffect
  async function handleTest() {
    dispatch(fetchWalkingMoneyRoad({ axiosPrivate }));
  }

  const walkingMoneyRoadRequestStatus = useAppSelector(
    selectWalkingMoneyRoadRequestStatus,
  );
  const walkingMoneyRoad = useAppSelector(selectWalkingMoneyRoad);
  let walkingMoneyRoadContent;
  if (walkingMoneyRoadRequestStatus === 'loading') {
    walkingMoneyRoadContent = <p>Loading...</p>;
  } else if (walkingMoneyRoadRequestStatus === 'failed') {
    if (walkingMoneyRoad === null) {
      walkingMoneyRoadContent = <EmptyWalkingMoneyRoad />;
    } else {
      walkingMoneyRoadContent = (
        <>
          <WalkingMoneyRoadList walkingMoneyRoad={walkingMoneyRoad} />
          <ContractNewMoneyRoadButton disable={false} />
        </>
      );
    }
  } else {
    walkingMoneyRoadContent = <p>Failed</p>;
  }

  return (
    <Wrapper>
      <Content>
        <MarginTemplate>
          {/* TODO: delete test code */}
          <button onClick={handleTest}>fetch test</button>
          {/* <div>{walkingMoneyRoadContent}</div> */}

          <div className="logo-positioner">
            <BANKIDZ />
          </div>
          <StyledHeader>{`돈길 걷는 뱅키는\n행복해요`}</StyledHeader>
          <div className="level-badge-positioner">
            <LevelBadge level={level} />
          </div>
          <div className="summary-positioner">
            <Summary current={1000} goal={5000} month={6} week={4} />
          </div>

          <WalkingMoneyRoadWrapper>
            <header>걷고있는 돈길</header>
            {walkingMoneyRoadContent}
            {/* {isEmpty === true ? (
              <EmptyWalkingMoneyRoad />
            ) : (
              <>
                <WalkingMoneyRoadList />
                <ContractNewMoneyRoadButton disable={false} />
              </>
            )} */}
          </WalkingMoneyRoadWrapper>

          <WaitingMoneyRoadWrapper>
            <header>대기중인 돈길</header>
            {/* @ts-expect-error */}
            {isEmpty === true ? (
              <EmptyWaitingMoneyRoad />
            ) : (
              <WaitingMoneyRoadList />
            )}
          </WaitingMoneyRoadWrapper>
        </MarginTemplate>
        <Spaceholder />
      </Content>

      <BackgroundBox level={level} />
      <BackgroundEllipse level={level} />
      <HomeBackgroundPositioner>
        {renderHomeBackground(level)}
      </HomeBackgroundPositioner>
      <HomeBankiPositioner>{renderHomeBanki(level)}</HomeBankiPositioner>
    </Wrapper>
  );
}

export default HomeKid;

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

const WalkingMoneyRoadWrapper = styled.div`
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
const BackgroundBox = styled.div<{ level: TLevel }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  width: 100%;
  height: 393px;
  z-index: 1;

  ${({ level }) =>
    level === 1 &&
    css`
      background: ${({ theme }) => theme.palette.level.grey100};
    `}
  ${({ level }) =>
    level === 2 &&
    css`
      background: ${({ theme }) => theme.palette.level.blue100};
    `}
  ${({ level }) =>
    level === 3 &&
    css`
      background: ${({ theme }) => theme.palette.level.red100};
    `}
  ${({ level }) =>
    level === 4 &&
    css`
      background: ${({ theme }) => theme.palette.level.green100};
    `}
  ${({ level }) =>
    level === 5 &&
    css`
      background: ${({ theme }) => theme.palette.level.yellow100};
    `}
`;

const BackgroundEllipse = styled.div<{ level: TLevel }>`
  position: absolute;
  top: 337px;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  width: 530px;
  height: 230px;
  border-radius: 265px / 115px;
  z-index: 2;

  ${({ level }) =>
    level === 1 &&
    css`
      background: ${({ theme }) => theme.palette.level.grey100};
    `}
  ${({ level }) =>
    level === 2 &&
    css`
      background: ${({ theme }) => theme.palette.level.blue100};
    `}
  ${({ level }) =>
    level === 3 &&
    css`
      background: ${({ theme }) => theme.palette.level.red100};
    `}
  ${({ level }) =>
    level === 4 &&
    css`
      background: ${({ theme }) => theme.palette.level.green100};
    `}
  ${({ level }) =>
    level === 5 &&
    css`
      background: ${({ theme }) => theme.palette.level.yellow100};
    `}
`;

const HomeBackgroundPositioner = styled.div`
  z-index: 3;
  position: absolute;
  top: 48px;
  right: 0;
`;

const HomeBankiPositioner = styled.div`
  z-index: 900;
  position: absolute;
  top: 146px;
  right: 0;
`;

// TabBar height: 47px;
const Spaceholder = styled.div`
  height: 80px;
  width: 100%;
`;

// 자식 - 홈 페이지
//         <button
//           onClick={() => {
//             navigate('/create/1', { state: { from: 'home' } });
//           }}
//         >
//           새로운 돈길 계약하기
//         </button>
//         <button
//           onClick={() => {
//             navigate('/pending/1');
//           }}
//         >
//           대기중인 돈길
//         </button>
