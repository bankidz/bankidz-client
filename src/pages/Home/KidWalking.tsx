import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import GiveUpExceeded from '@components/common/bottomSheets/sheetContents/GiveUpExceeded';
import GiveUpCheck from '@components/common/bottomSheets/sheetContents/GiveUpCheck';
import SheetComplete from '@components/common/bottomSheets/sheetContents/SheetComplete';
import Receipt from '@components/common/Receipt';
import ProceedingStemp from '@components/home/walking/ProceedingStemp';
import WalkingMoneyRoadSummary from '@components/home/walking/WalkingMoneyRoadSummary';
import MarginTemplate from '@components/layout/MarginTemplate';
import Spacer from '@components/layout/Spaceholder';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import { calcRatio } from '@lib/styles/theme';
import { TPercent } from '@lib/types/kid';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import renderGraph from '@lib/utils/kid/renderGraph';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import {
  giveUpWalkingMoneyRoad,
  selectWalkingMoneyRoads,
} from '@store/slices/walkingMoneyRoadsSlice';
import { selectWeeklyProgress } from '@store/slices/weeklyProgressSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { TFetchStatus } from '@lib/types/api';

function KidWalking() {
  const { id } = useParams();
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);

  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const targetWalkingMoneyRoad = walkingMoneyRoads?.find(
    (walkingMoneyRoad) => walkingMoneyRoad.id === parseInt(id!),
  );
  const {
    isMom,
    title,
    itemName,
    interestRate,
    totalPrice,
    weekPrice,
    weeks,
    createdAt,
    progressList,
  } = targetWalkingMoneyRoad!;

  const weeklyProgress = useAppSelector(selectWeeklyProgress);
  const { currentSavings } = weeklyProgress!;
  const percent = Math.ceil((currentSavings / totalPrice / 10) * 100) * 10;

  const [openGiveUpCheck, onGiveUpCheckOpen, onGiveUpCheckDismiss] =
    useBottomSheet(false);
  const [openGiveUpCompleted, onGiveUpCompletedOpen, onGiveUpCompletedDismiss] =
    useBottomSheet(false);
  const [openExceeded, onExceededOpen, onExceededDismiss] =
    useBottomSheet(false);
  const [openCancelCompleted, onCancelCompletedOpen, onCancelCompletedDismiss] =
    useBottomSheet(false);

  const axiosPrivate = useAxiosPrivate();
  const [giveUpWalkingMoneyRoadStatus, setGiveUStatus] =
    useState<TFetchStatus>('idle');
  const canGiveUp =
    walkingMoneyRoads !== null &&
    walkingMoneyRoads !== [] &&
    giveUpWalkingMoneyRoadStatus === 'idle';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // '정말 포기할거예요?' 바텀시트 하단 왼쪽 회색 버튼
  async function handleGiveUpButtonClick() {
    if (canGiveUp) {
      try {
        setGiveUStatus('pending');
        // await dispatch(
        //   giveUpWalkingMoneyRoad({
        //     axiosPrivate,
        //     id: parseInt(id!),
        //   }),
        // ).unwrap();
        onGiveUpCheckDismiss();
        onGiveUpCompletedOpen();
      } catch (error: any) {
        // TODO: 포기 횟수 초과 시 API response 확인
        console.log('error.message', error.message);
        console.log('error.status', error.status);
        if (error.status === 403) {
          onGiveUpCheckDismiss();
          onExceededOpen();
        } else {
          console.log(error.message);
        }
      } finally {
        setGiveUStatus('idle');
      }
    }
  }

  // '정말 포기할거예요?' 바텀시트 하단 오른쪽 노란색 버튼
  function handleRetryButtonClick() {
    onGiveUpCheckDismiss();
    onCancelCompletedOpen();
  }

  return (
    <Wrapper>
      <Content>
        <MarginTemplate>
          <FlexContainer>
            <div className="graph-wrapper">
              {renderGraph(percent as TPercent)}
            </div>
            <span className="challenging">
              {progressList?.length}주차 도전중
            </span>
            <div className="title">{title}</div>
            <WalkingMoneyRoadSummary
              currentSavings={currentSavings}
              totalPrice={totalPrice}
            />

            <InterestStamp>
              <div className="text-wrapper">
                <span className="header">이자 스탬프</span>
                <span className="body">
                  돈길 걷기를 완료한 주차에 해당하는 만큼 이자를 받아요
                </span>
                <ProceedingStemp weeks={weeks} stemp={progressList!} />
              </div>
            </InterestStamp>

            <MoneyRoadContractContent>
              <span>돈길 계약 내용</span>
              <div className="receipt-positioner">
                <Receipt
                  createdAt={createdAt}
                  interestRate={interestRate}
                  isMom={isMom}
                  itemName={itemName}
                  totalPrice={totalPrice}
                  weekPrice={weekPrice}
                  weeks={weeks}
                />
              </div>
            </MoneyRoadContractContent>
            <GiveUpMoneyRoadButton onClick={onGiveUpCheckOpen}>
              돈길 포기하기
            </GiveUpMoneyRoadButton>
            <Spacer />
          </FlexContainer>
        </MarginTemplate>
      </Content>

      <Background colorByLevel={colorByLevel}></Background>

      {/* bottom sheets */}
      {/* 정말 포기할거에요? */}
      <CommonSheet open={openGiveUpCheck} onDismiss={onGiveUpCheckDismiss}>
        <GiveUpCheck
          onGiveUpButtonClick={handleGiveUpButtonClick}
          onDismiss={handleRetryButtonClick}
        />
      </CommonSheet>
      {/* 돈길이 포기되었어요 */}
      <CommonSheet
        open={openGiveUpCompleted}
        onDismiss={() => {
          navigate(-1);
        }}
      >
        <SheetComplete
          type="giveUp"
          title={title}
          onDismiss={() => {
            navigate(-1);
          }}
        />
      </CommonSheet>
      {/* 포기횟수 초과 */}
      <CommonSheet open={openExceeded} onDismiss={onExceededDismiss}>
        <GiveUpExceeded onDismiss={onExceededDismiss} />
      </CommonSheet>
      {/* '포기하기'가 취소되었어요 */}
      <CommonSheet
        open={openCancelCompleted}
        onDismiss={onCancelCompletedDismiss}
      >
        <SheetComplete type="cancel" onDismiss={onCancelCompletedDismiss} />
      </CommonSheet>
    </Wrapper>
  );
}

export default KidWalking;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  background: ${({ theme }) => theme.palette.greyScale.white};
`;

const Content = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 2;

  .graph-wrapper {
    margin-top: 56px;
    height: 240px;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      height: 208.1px;
      margin-top: 32px;
      margin-left: ${calcRatio(13, 250)};
    }
  }
  .challenging {
    margin-top: 32px;
    ${({ theme }) => theme.typo.text.T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  .title {
    margin-top: 16px;
    margin-bottom: 32px;
    ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InterestStamp = styled.div`
  margin-top: 80px;
  width: 100%;
  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .header {
      ${({ theme }) => theme.typo.text.T_16_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
    .body {
      margin-top: 16px;
      margin-bottom: 24px;
      ${({ theme }) => theme.typo.text.S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey600};
    }
  }
`;

const MoneyRoadContractContent = styled.div`
  margin-top: 80px;
  width: 100%;
  span {
    height: 16px;
    ${({ theme }) => theme.typo.text.T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  .receipt-positioner {
    margin-top: 20px;
  }
`;

const GiveUpMoneyRoadButton = styled.button`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.palette.greyScale.grey500};
  margin-top: 48px;
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.typo.button.UnderlinedText_14_EB};
  color: ${({ theme }) => theme.palette.greyScale.grey500};
`;

const Background = styled.div<{ colorByLevel: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translate3d(-50%, 0, 0);

  height: 337px;
  width: 100%;
  background-color: ${({ colorByLevel }) => colorByLevel};

  &:after {
    width: ${calcRatio(530, 360)};
    margin: 0 auto;
    height: 230px;
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    border-radius: 50%;
    position: absolute;
    top: 305px;
    left: calc(-${calcRatio(530, 360)} / 2 + 50%);
    content: '';
  }
`;
