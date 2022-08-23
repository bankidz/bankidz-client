import { useState } from 'react';
import styled from 'styled-components';
import Summary from '@components/home/summary/Summary';
import TotalInterest from '@components/home/detail/TotalInterest';
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
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import useTargetDongil from '@components/home/detail/useTargetDongil';

import useBottomSheet from '@lib/hooks/useBottomSheet';
import OverViewSection from '@components/home/detail/OverViewSection';
import InterestStampListSection from '@components/home/detail/InterestStampListSection';
import DongilContractContentSection from '@components/home/detail/DongilContractContentSection';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import CommonSheet from '@components/common/bottomSheets/commonSheet/CommonSheet';
import SheetCompleted from '@components/common/bottomSheets/commonSheet/SheetCompleted';
import GiveUpExceeded from '@components/common/bottomSheets/commonSheet/GiveUpExceeded';
import { contextType } from 'react-modal';

function Detail() {
  const { id } = useParams();
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);
  let level: TLevel = useAppSelector(selectLevel)!;
  const temp = useAppSelector(selectLevel)!;
  if (isKid === true) {
    level = temp;
  } else if (isKid === false) {
    level = selectedKid?.level!;
  }
  const colorByLevel = getColorByLevel(level!);

  // 자녀 - 걷고있는 돈길 / 부모 - 금주의 돈길
  const targetDongil = useTargetDongil(id!);
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
  const {
    isOpen,
    setOpenBottomSheet,
    setCloseBottomSheet,
    openSheetBySequence,
  } = useGlobalBottomSheet();

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

  //1. '돈길 포기하기' 바텀시트 열기
  const openGiveUpBottomSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'GiveUpCheck',
      sheetProps: {
        open: true,
      },
      contentProps: {
        onGiveUpButtonClick: handleGiveUpButtonClick,
        onDismiss: handleCancelGiveUpBottomSheet,
      },
    });
  };

  // 2-a. 포기하기 버튼 클릭
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
        // '포기 완료' 바텀시트
        handleGiveUpCompletedBottomSheet();
      } catch (error) {
        if (error === 'E400-40007') {
          // 포기횟수 초과
          handleGiveUpExceededBottomSheet();
        } else {
          console.log(error);
        }
      } finally {
        setGiveUpWalkingDongilStatus('idle');
      }
    }
  }

  //2-b. 포기하기 취소 버튼 클릭
  const handleCancelGiveUpBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'SheetCompleted',
        sheetProps: {
          open: true,
        },
        contentProps: {
          type: 'cancel',
        },
      });
    openSheetBySequence(openSheet);
  };

  // 3-a. '포기 완료' 바텀시트 열기
  const handleGiveUpCompletedBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'SheetCompleted',
        sheetProps: {
          open: true,
        },
        contentProps: {
          type: 'giveUp',
          title: title,
          onDismiss: handleConfirmButtonClick,
        },
      });
    openSheetBySequence(openSheet);
  };
  // 3-b. '포기 횟수 초과' 바텀시트 열기
  const handleGiveUpExceededBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'GiveUpExceeded',
        sheetProps: {
          open: true,
        },
        contentProps: { onDismiss: setCloseBottomSheet },
      });
    openSheetBySequence(openSheet);
  };

  // 4-a. '돈길이 포기되었어요' 바텀시트 확인 버튼
  const handleConfirmButtonClick = () => {
    setCloseBottomSheet();
    dispatch(deleteClientSideWalkingDongilById(parseInt(id!)));
    navigate('/');
  };

  return (
    <Wrapper>
      <Content>
        <MarginTemplate>
          <FlexContainer>
            <OverViewSection
              progressList={progressList}
              successWeeks={successWeeks}
              title={title}
              weeks={weeks}
            />
            <Summary
              variant="Detail"
              weekPrice={weekPrice}
              weeks={weeks}
              successWeeks={successWeeks}
            />
            <InterestStampListSection
              weeks={weeks}
              progressList={progressList}
            />
            <TotalInterest
              weeks={weeks}
              interestRate={interestRate}
              totalPrice={totalPrice}
              successWeeks={successWeeks}
            />
            <DongilContractContentSection
              interestRate={interestRate}
              isMom={isMom}
              itemName={itemName}
              progressList={progressList}
              totalPrice={totalPrice}
              weekPrice={weekPrice}
              weeks={weeks}
            />
            {isKid === true && challengeStatus !== 'FAILED' && (
              <GiveUpDongilButton onClick={openGiveUpBottomSheet}>
                돈길 포기하기
              </GiveUpDongilButton>
            )}
            <LargeSpacer isWhite />
          </FlexContainer>
        </MarginTemplate>
      </Content>
      <Background colorByLevel={colorByLevel} />

      {/* 정말 포기할거에요? */}
      {/* <CommonSheet open={openGiveUpCheck} onDismiss={onGiveUpCheckDismiss}>
        <GiveUpCheck
          onGiveUpButtonClick={handleGiveUpButtonClick}
          onDismiss={handleRetryButtonClick}
        />
      </CommonSheet> */}
      {/* 돈길이 포기되었어요 */}
      {/* <CommonSheet
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
      </CommonSheet> */}
      {/* 포기횟수 초과 */}
      {/* <CommonSheet open={openExceeded} onDismiss={onExceededDismiss}>
        <GiveUpExceeded onDismiss={onExceededDismiss} />
      </CommonSheet> */}
      {/* '포기하기'가 취소되었어요 */}
      {/* <CommonSheet
        open={openCancelCompleted}
        onDismiss={onCancelCompletedDismiss}
      >
        <SheetCompleted type="cancel" onDismiss={onCancelCompletedDismiss} />
      </CommonSheet> */}
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
