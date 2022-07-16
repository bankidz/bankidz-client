import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Step1 from '@components/kid/create/content/Step1';
import Step2 from '@components/kid/create/content/Step2';
import Progress from '@components/kid/create/Progress';
import Margin from '@components/layout/Margin';
import Step3 from '@components/kid/create/content/Step3';
import Step4 from '@components/kid/create/content/Step4';
import { useEffect, useState } from 'react';
import { kidMock } from '@lib/mocks/kid';
import { TFamilyState } from '@lib/types/kid';
import Step5 from '@components/kid/create/content/Step5';

const title = [
  '누구와 계약하나요?',
  '계약 상품이 무엇인가요?',
  '이름과 목표 금액을 정해요',
  '매주 얼마를 모을까요?',
  '멋진 사인으로\n부모님께 계약서를 보내요',
];

function CreateKid() {
  const { step } = useParams();
  const [parents, setParents] = useState<TFamilyState[]>();
  const { getFamily } = kidMock(1);

  const typedStep = (parsed: number) => {
    if (step && parsed > 0 && parsed <= 5) {
      return parsed as 1 | 2 | 3 | 4 | 5;
    } else {
      throw 'step error';
    }
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await getFamily();
        const parent = response.filter((v) => v.isKid === false);
        setParents(parent);
      } catch (e) {
        console.log('서버통신오류');
      }
    }
    fetchData();
  }, []);

  const renderContent = (step: number) => {
    if (parents?.length === 1) {
      switch (step) {
        case 1:
          return <Step2 currentStep={1} />;
        case 2:
          return <Step3 currentStep={2} />;
        case 3:
          return <Step4 currentStep={3} />;
        case 4:
          return <Step5 currentStep={4} />;

        default:
          throw 'error';
      }
    } else {
      switch (step) {
        case 1:
          return <Step1 currentStep={1} />;
        case 2:
          return <Step2 currentStep={2} />;
        case 3:
          return <Step3 currentStep={3} />;
        case 4:
          return <Step4 currentStep={4} />;
        case 5:
          return <Step5 currentStep={4} />;
        default:
          throw 'error';
      }
    }
  };

  return (
    <>
      {step && (
        <Wrapper>
          <Progress
            step={typedStep(parseInt(step))}
            skipSelectParents={parents?.length === 1 ? true : false}
          />
          <Margin>
            <h1>
              {parents?.length === 1
                ? title[parseInt(step)]
                : title[parseInt(step) - 1]}
            </h1>
            {renderContent(parseInt(step))}
          </Margin>
        </Wrapper>
      )}
    </>
  );
}

export default CreateKid;

const Wrapper = styled.div`
  & > :first-child {
    margin: 0px auto;
  }
  h1 {
    margin-top: 24px;
    margin-bottom: 56px;

    font-family: 'TmoneyRoundWind';
    font-size: 24px;
    line-height: 31px;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.greyScale.black};
    white-space: pre-wrap;
  }
`;
