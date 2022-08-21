import { useState } from 'react';
import styled from 'styled-components';
import Summary from '@components/home/sumary/Summary';
import InterestStampList from '@components/home/walking/InterestStampList';
import TotalInterest from '@components/home/walking/TotalInterest';
import Receipt from '@components/common/receipt/Receipt';
import MarginTemplate from '@components/layout/MarginTemplate';
import LargeSpacer from '@components/layout/LargeSpacer';

import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectIsKid, selectLevel } from '@store/slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import {
  deleteClientSideWalkingDongilById,
  deleteWalkingDongil,
  selectWalkingDongils,
} from '@store/slices/walkingDongilsSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';

import { calcRatio } from '@lib/styles/theme';
import renderGraph from '@lib/utils/render/renderGraph';
import { TLevel } from '@lib/types/TLevel';
import { TPercent } from '@lib/types/TPercent';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import getTargetDongil from '@components/home/detail/getTargetDongil';

import useBottomSheet from '@lib/hooks/useBottomSheet';
import CommonSheet from '@components/common/bottomSheets/commonSheet/CommonSheet';
import GiveUpCheck from '@components/common/bottomSheets/commonSheet/GiveUpCheck';
import SheetCompleted from '@components/common/bottomSheets/commonSheet/SheetCompleted';
import GiveUpExceeded from '@components/common/bottomSheets/commonSheet/GiveUpExceeded';

function Detail() {
  const { id } = useParams();
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);
  let level: TLevel;
  if (isKid === true) {
    level = useAppSelector(selectLevel)!;
  } else if (isKid === false) {
    level = selectedKid?.level!;
  }
  const colorByLevel = getColorByLevel(level!);

  // 자녀 - 걷고있는 돈길 / 부모 - 금주의 돈길
  const targetDongil = getTargetDongil(id!);
  const {
    isMom,
    title,
    itemName,
    interestRate,
    totalPrice,
    weekPrice,
    weeks,
    progressList,
    successWeeks,
    challengeStatus,
  } = targetDongil!;
  const percent = Math.ceil((successWeeks / weeks / 10) * 100) * 10;

  const [openGiveUpCheck, onGiveUpCheckOpen, onGiveUpCheckDismiss] =
    useBottomSheet(false);
  const [openGiveUpCompleted, onGiveUpCompletedOpen, onGiveUpCompletedDismiss] =
    useBottomSheet(false);
  const [openExceeded, onExceededOpen, onExceededDismiss] =
    useBottomSheet(false);
  const [openCancelCompleted, onCancelCompletedOpen, onCancelCompletedDismiss] =
    useBottomSheet(false);

  const axiosPrivate = useAxiosPrivate();
  const [giveUpWalkingDongilStatus, setGiveUpWalkingDongilStatus] =
    useState<TFetchStatus>('idle');
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const canGiveUpWalkingDongil =
    walkingDongils !== null &&
    walkingDongils !== [] &&
    giveUpWalkingDongilStatus === 'idle';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // '정말 포기할거예요?' 바텀시트 하단 왼쪽 회색 버튼
  async function handleGiveUpButtonClick() {
    if (canGiveUpWalkingDongil) {
      try {
        setGiveUpWalkingDongilStatus('pending');
        await dispatch(
          deleteWalkingDongil({
            axiosPrivate,
            id: parseInt(id!),
          }),
        ).unwrap();
        onGiveUpCheckDismiss();
        onGiveUpCompletedOpen();
      } catch (error) {
        if (error === 'E400-40007') {
          onGiveUpCheckDismiss();
          onExceededOpen();
        } else {
          console.log(error);
        }
      } finally {
        setGiveUpWalkingDongilStatus('idle');
      }
    }
  }

  // '정말 포기할거예요?' 바텀시트 하단 오른쪽 노란색 버튼
  function handleRetryButtonClick() {
    onGiveUpCheckDismiss();
    onCancelCompletedOpen();
  }

  // '돈길이 포기되었어요' 바텀시트 확인 버튼
  function handleConfirmButtonClick() {
    dispatch(deleteClientSideWalkingDongilById(parseInt(id!)));
    navigate('/');
  }

  return (
    <Wrapper>
      <Content>
        <MarginTemplate>
          <FlexContainer>
            <div className="graph">{renderGraph(percent as TPercent)}</div>
            <span className="challenging">
              {progressList?.length}주차 도전중
            </span>
            <span className="title">{title}</span>

            <Summary
              variant="Detail"
              weekPrice={weekPrice}
              weeks={weeks}
              successWeeks={successWeeks}
            />

            <InterestStampListWrapper>
              <div className="text-wrapper">
                <span className="header">이자 스탬프</span>
                <span className="body">
                  돈길 걷기를 완료한 주차에 해당하는 만큼 이자를 받아요
                </span>
                <InterestStampList weeks={weeks} stamps={progressList!} />
              </div>
            </InterestStampListWrapper>

            <TotalInterest
              weeks={weeks}
              interestRate={interestRate}
              totalPrice={totalPrice}
              successWeeks={successWeeks}
            />

            <DongilContractContent>
              <span>돈길 계약 내용</span>
              <div className="receipt-wrapper">
                {progressList && (
                  <Receipt
                    createdAt={progressList[0].approvedAt}
                    interestRate={interestRate}
                    isMom={isMom}
                    itemName={itemName}
                    totalPrice={totalPrice}
                    weekPrice={weekPrice}
                    weeks={weeks}
                  />
                )}
              </div>
            </DongilContractContent>
            {isKid === true && challengeStatus !== 'FAILED' && (
              <GiveUpDongilButton onClick={onGiveUpCheckOpen}>
                돈길 포기하기
              </GiveUpDongilButton>
            )}
            <LargeSpacer isWhite={true} />
          </FlexContainer>
        </MarginTemplate>
      </Content>

      <Background colorByLevel={colorByLevel}></Background>
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
          navigate('/');
        }}
      >
        <SheetCompleted
          type="giveUp"
          title={title}
          onDismiss={handleConfirmButtonClick}
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
        <SheetCompleted type="cancel" onDismiss={onCancelCompletedDismiss} />
      </CommonSheet>
    </Wrapper>
  );
}

export default Detail;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
  background: ${({ theme }) => theme.palette.greyScale.white};
`;

const Content = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 2;

  .graph {
    margin-top: 56px;
    height: 240px;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
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

const InterestStampListWrapper = styled.div`
  margin-top: 80px;
  margin-bottom: 40px;
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
  .receipt-wrapper {
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
