import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import GiveUpExceeded from '@components/common/bottomSheets/sheetContents/GiveUpExceeded';
import GiveUpCheck from '@components/common/bottomSheets/sheetContents/GiveUpCheck';
import SheetComplete from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import Receipt from '@components/common/Receipt';
import ProceedingStemp from '@components/home/walking/InterestStampList';
import WalkingSummary from '@components/home/walking/WalkingSummary';
import MarginTemplate from '@components/layout/MarginTemplate';
import Spacer from '@components/layout/Spaceholder';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import { calcRatio } from '@lib/styles/theme';
import { TPercent } from '@lib/types/kid';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import renderGraph from '@lib/utils/kid/renderGraph';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import { selectWeeklyProgress } from '@store/slices/weeklyDongilSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { TFetchStatus } from '@lib/types/api';
import { selectWalkingDongils } from '@store/slices/walkingDongilSlice';

function KidWalking() {
  const { id } = useParams();
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);

  const walkingDongils = useAppSelector(selectWalkingDongils);
  const targetWalkingDongil = walkingDongils?.find(
    (walkingDongil) => walkingDongil.id === parseInt(id!),
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
  } = targetWalkingDongil!;

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
  const [giveUpWalkingDongilStatus, setGiveUStatus] =
    useState<TFetchStatus>('idle');
  const canGiveUp =
    walkingDongils !== null &&
    walkingDongils !== [] &&
    giveUpWalkingDongilStatus === 'idle';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // '?????? ???????????????????' ???????????? ?????? ?????? ?????? ??????
  async function handleGiveUpButtonClick() {
    if (canGiveUp) {
      try {
        setGiveUStatus('pending');
        // await dispatch(
        //   giveUpWalkingDongil({
        //     axiosPrivate,
        //     id: parseInt(id!),
        //   }),
        // ).unwrap();
        onGiveUpCheckDismiss();
        onGiveUpCompletedOpen();
      } catch (error: any) {
        // TODO: ?????? ?????? ?????? ??? API response ??????
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

  // '?????? ???????????????????' ???????????? ?????? ????????? ????????? ??????
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
              {progressList?.length}?????? ?????????
            </span>
            <div className="title">{title}</div>
            <WalkingSummary
              currentSavings={currentSavings}
              totalPrice={totalPrice}
            />

            <InterestStamp>
              <div className="text-wrapper">
                <span className="header">?????? ?????????</span>
                <span className="body">
                  ?????? ????????? ????????? ????????? ???????????? ?????? ????????? ?????????
                </span>
                <ProceedingStemp weeks={weeks} stemp={progressList!} />
              </div>
            </InterestStamp>

            <DongilContractContent>
              <span>?????? ?????? ??????</span>
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
            </DongilContractContent>
            <GiveUpDongilButton onClick={onGiveUpCheckOpen}>
              ?????? ????????????
            </GiveUpDongilButton>
            <Spacer />
          </FlexContainer>
        </MarginTemplate>
      </Content>

      <Background colorByLevel={colorByLevel}></Background>

      {/* bottom sheets */}
      {/* ?????? ??????????????????? */}
      <CommonSheet open={openGiveUpCheck} onDismiss={onGiveUpCheckDismiss}>
        <GiveUpCheck
          onGiveUpButtonClick={handleGiveUpButtonClick}
          onDismiss={handleRetryButtonClick}
        />
      </CommonSheet>
      {/* ????????? ?????????????????? */}
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
      {/* ???????????? ?????? */}
      <CommonSheet open={openExceeded} onDismiss={onExceededDismiss}>
        <GiveUpExceeded onDismiss={onExceededDismiss} />
      </CommonSheet>
      {/* '????????????'??? ?????????????????? */}
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

const DongilContractContent = styled.div`
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

const GiveUpDongilButton = styled.button`
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

  height: 288px;
  width: 100%;
  background-color: ${({ colorByLevel }) => colorByLevel};

  &:after {
    width: ${calcRatio(530, 360)};
    margin: 0 auto;
    height: 230px;
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    border-radius: 50%;
    position: absolute;
    top: 257px;
    left: calc(-${calcRatio(530, 360)} / 2 + 50%);
    content: '';
  }
`;
