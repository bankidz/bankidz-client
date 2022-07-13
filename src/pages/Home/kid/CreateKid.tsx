import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Step1 from '@components/kid/create/content/Step1';
import Step2 from '@components/kid/create/content/Step2';
import Progress from '@components/kid/create/Progress';
import Margin from '@components/layout/Margin';
import Step3 from '@components/kid/create/content/Step3';

function CreateKid() {
  const { step } = useParams();
  const typedStep = (parsed: number) => {
    if (step && parsed > 0 && parsed <= 5) {
      return parsed as 1 | 2 | 3 | 4 | 5;
    } else {
      throw 'step error';
    }
  };

  const title = [
    '누구와 계약하나요?',
    '계약 상품이 무엇인가요?',
    '이름과 목표 금액을 정해요',
    '매주 얼마를 모을까요?',
    '멋진 사인으로\n부모님께 계약서를 보내요',
  ];

  const renderContent = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 />;
        break;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        throw 'error';
    }
  };

  return (
    <>
      {step && (
        <Wrapper>
          <Progress step={typedStep(parseInt(step))} />
          <Margin>
            <h1>{title[parseInt(step) - 1]}</h1>
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
