import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import GiveUpMoneyRoadSheetContent from '@components/common/bottomSheets/sheetContents/GiveUpMoneyRoadSheetContent';
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
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import { selectWalkingMoneyRoads } from '@store/slices/walkingMoneyRoadsSlice';
import { selectWeeklyProgress } from '@store/slices/weeklyProgressSlice';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function KidWalking() {
  const { challengeId } = useParams();
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);

  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const targetWalkingMoneyRoad = walkingMoneyRoads?.find(
    (walkingMoneyRoad) => walkingMoneyRoad.id === parseInt(challengeId!),
  );
  const {
    id,
    isMom,
    title,
    itemName,
    challengeCategoryName,
    isAchieved,
    interestRate,
    totalPrice,
    weekPrice,
    weeks,
    createdAt,
    status,
    progressList,
    comment,
  } = targetWalkingMoneyRoad!;

  const weeklyProgress = useAppSelector(selectWeeklyProgress);
  const { currentSavings } = weeklyProgress!;
  const percent = Math.ceil((currentSavings / totalPrice / 10) * 100) * 10;

  const [open, onOpen, onDismiss] = useBottomSheet(false);

  // 걷고있는 돈길 페이지 하단 돈길 포기하기 버튼
  function handleGiveUpMoneyRoadButtonClick() {
    console.log('handle give up money road button click');
    onOpen();
  }
  // 모달 내부 왼쪽 회색 버튼
  function handleGiveUpButtonClick() {
    console.log('handle give up button click');
  }
  return (
    <Wrapper>
      <CommonSheet open={open} onDismiss={onDismiss}>
        <GiveUpMoneyRoadSheetContent
          onGiveUpButtonClick={handleGiveUpButtonClick}
          onDismiss={onDismiss}
        />
      </CommonSheet>
      <Content>
        <MarginTemplate>
          <FlexContainer>
            <div className="graph-wrapper">
              {renderGraph(percent as TPercent)}
            </div>
            <span className="challenging">
              {progressList!.length}주차 도전중
            </span>
            <div className="title">{title}</div>
            <WhiteBox>
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
              <GiveUpMoneyRoadButton onClick={handleGiveUpMoneyRoadButtonClick}>
                돈길 포기하기
              </GiveUpMoneyRoadButton>
              <Spacer />
            </WhiteBox>
          </FlexContainer>
        </MarginTemplate>
      </Content>
      <Background colorByLevel={colorByLevel}></Background>
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
`;

const Content = styled.div`
  width: 100%;
  position: absolute;
  z-index: 100;

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

const WhiteBox = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  z-index: 100;
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

const Background = styled.div<{ colorByLevel: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  height: 337px;
  width: 100%;
  z-index: 1;
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

const GiveUpMoneyRoadButton = styled.button`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.palette.greyScale.grey500};
  margin-top: 48px;
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.typo.button.UnderlinedText_14_EB};
  color: ${({ theme }) => theme.palette.greyScale.grey500};
`;
