import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import Summary from '@components/blocks/home/summary/Summary';
import TotalInterest from '@components/blocks/home/detail/TotalInterest';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';
import LargeSpacer from '@components/atoms/layout/LargeSpacer';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { calcRatio } from '@lib/styles/theme';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import useTargetDongil from '@components/blocks/home/detail/useTargetDongil';
import OverViewSection from '@components/blocks/home/detail/OverViewSection';
import InterestStampListSection from '@components/blocks/home/detail/InterestStampListSection';
import DongilContractContentSection from '@components/blocks/home/detail/DongilContractContentSection';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useLevel from '@lib/hooks/useLevel';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import useAPIError from '@lib/hooks/globalErrorHandler/useAPIError';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

function DetailPage() {
  const { id } = useParams();
  const isKid = useAppSelector(selectIsKid);
  const level = useLevel();
  const colorByLevel = getColorByLevel(level!);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    isPaid: boolean;
  };
  const isPaid = state?.isPaid;

  const targetDongil = useTargetDongil(id!, isPaid);
  const [copy] = useState<IChallengeDTO>(targetDongil!); // 포기하기 이후 애니메이션 렌더링용 카피
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
  } = targetDongil || copy;
  const { setOpenBottomSheet, setCloseBottomSheet, openSheetBySequence } =
    useGlobalBottomSheet();

  // 4-a. '돈길이 포기되었어요' 바텀시트 확인 버튼
  const handleConfirmButtonClick = () => {
    navigate('/', { state: { direction: 'navigate-pop' } });
    setCloseBottomSheet();
    queryClient.invalidateQueries([queryKeys.CHALLENGE, 'walking']);
  };

  // 3-a. 포기 완료
  const openGiveUpCompletedBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Completed',
        contentProps: {
          type: 'giveUp',
          title,
          onMainActionClick: handleConfirmButtonClick,
        },
      });
    openSheetBySequence(openSheet);
  };

  // 3-b. 포기 횟수 초과
  const openGiveUpExceededBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Notice',
        contentProps: { type: 'giveUpExceeded' },
      });
    openSheetBySequence(openSheet);
  };

  // 3-c. 오늘은 뱅키즈 쉬는날
  const openNoticeSundayBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Notice',
        contentProps: {
          type: 'sunday',
        },
      });
    openSheetBySequence(openSheet);
  };

  // 2-a. 포기하기
  const queryClient = useQueryClient();
  const { handleError } = useAPIError({
    403: {
      'E403-40007': openGiveUpExceededBottomSheet,
      'E403-40014': openNoticeSundayBottomSheet,
    },
  });
  const deleteMutation = useMutation(challengeAPI.deleteChallenge, {
    onSuccess: () => {
      openGiveUpCompletedBottomSheet();
    },
    onError: handleError,
  });
  const handleGiveUpButtonClick = () => {
    deleteMutation.mutate(parseInt(id!));
  };

  // 2-b. 다시 도전해볼게요 -> '포기하기'가 취소되었어요
  const openCancelGiveUpBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Completed',
        contentProps: {
          type: 'cancel',
        },
      });
    openSheetBySequence(openSheet);
  };

  // 1. 돈길 포기하기 -> 정말 포기할거에요?
  const openGiveUpBottomSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'GiveUpCheck',
      contentProps: {
        onGiveUpButtonClick: handleGiveUpButtonClick,
        onDismiss: openCancelGiveUpBottomSheet,
      },
    });
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
    </Wrapper>
  );
}

export default DetailPage;

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
  width: 117px;
  height: 46px;
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
