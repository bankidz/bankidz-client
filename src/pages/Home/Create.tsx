import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Step1 from '@components/home/create/steps/Step1';
import Step2 from '@components/home/create/steps/Step2';
import Progress from '@components/home/create/Progress';
import MarginTemplate from '@components/layout/MarginTemplate';
import Step3 from '@components/home/create/steps/Step3';
import Step4 from '@components/home/create/steps/Step4';
import Step5 from '@components/home/create/steps/Step5';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { setParent } from '@store/slices/createChallengeSlice';
import useFamilyQuery from '@lib/hooks/queries/useFamilyQuery';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import SlideTransition from '@components/layout/SlideTransition';

export interface CreateStepProps {
  currentStep: number;
  onNextButtonClick: () => void;
}

type TStep = 1 | 2 | 3 | 4 | 5;

const title = [
  <h1>누구와 계약하나요?</h1>,
  <h1>계약 상품이 무엇인가요?</h1>,
  <h1>이름과 목표 금액을 정해요</h1>,
  <h1 style={{ marginBottom: '22px' }}>
    <p>총 얼마 보상받고,</p>
    <p>매주 얼마 모을래요?</p>
  </h1>,
  <h1>
    <p>멋진 사인으로</p>
    <p>부모님께 계약서를 보내요</p>
  </h1>,
];

function Create() {
  const [step, setStep] = useState<TStep>(1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const dispatch = useAppDispatch();
  const { data: familyData, status } = useFamilyQuery();
  const parents = familyData?.familyUserList.filter((member) => !member.isKid);
  const isAlone = parents?.length === 1;

  useEffect(() => {
    if (isAlone) {
      dispatch(setParent(parents[0].isFemale));
    }
  }, [isAlone]);

  const onPrevButtonClick = () => {
    setDirection('prev');
    setStep((step - 1) as TStep);
  };

  const onNextButtonClick = () => {
    setDirection('next');
    setStep((step + 1) as TStep);
  };

  const renderContent = (step: TStep) => {
    if (isAlone) {
      switch (step) {
        case 1:
          return (
            <Step2 currentStep={1} onNextButtonClick={onNextButtonClick} />
          );
        case 2:
          return (
            <Step3 currentStep={2} onNextButtonClick={onNextButtonClick} />
          );
        case 3:
          return (
            <Step4 currentStep={3} onNextButtonClick={onNextButtonClick} />
          );
        case 4:
          return <Step5 />;
        case 5:
          return <Navigate to="/" />;
      }
    } else {
      switch (step) {
        case 1:
          return (
            <Step1 currentStep={1} onNextButtonClick={onNextButtonClick} />
          );
        case 2:
          return (
            <Step2 currentStep={2} onNextButtonClick={onNextButtonClick} />
          );
        case 3:
          return (
            <Step3 currentStep={3} onNextButtonClick={onNextButtonClick} />
          );
        case 4:
          return (
            <Step4 currentStep={4} onNextButtonClick={onNextButtonClick} />
          );
        case 5:
          return <Step5 />;
      }
    }
  };

  return (
    <ForegroundTemplate
      label="돈길 계약하기"
      customEvent={step !== 1 ? onPrevButtonClick : undefined}
      to="/"
    >
      <Wrapper>
        {step && (
          <>
            <Progress
              step={step}
              skipSelectParents={status === 'success' && isAlone ? true : false}
            />
            <SlideTransition keyValue={step} direction={direction}>
              <ContentWrapper>
                <MarginTemplate>
                  {status === 'success' && isAlone
                    ? title[step]
                    : title[step - 1]}
                  {renderContent(step)}
                </MarginTemplate>
              </ContentWrapper>
            </SlideTransition>
          </>
        )}
      </Wrapper>
    </ForegroundTemplate>
  );
}

export default Create;

const Wrapper = styled.div`
  padding-top: 16px;

  & > :first-child {
    margin: 0px auto;
  }
  h1 {
    margin-top: 24px;
    margin-bottom: 56px;

    ${({ theme }) => theme.typo.input.Title_T_24_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    white-space: pre-wrap;

    /* paragraph-spacing 대용 */
    & > p:last-child {
      margin-top: 10px;
    }
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 80px);
`;
