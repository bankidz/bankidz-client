import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import KidMain from './KidMain';
import Step from './Step';
import ParentMain from './ParentMain';
import { ReactComponent as Exit } from '@assets/icons/exit.svg';
import SheetButton from '@components/common/buttons/SheetButton';
import SlideTransition from '@components/layout/SlideTransition';
import Progress from '@components/common/progress/Progress';

interface GuideTemplateProps {
  page: 'manage' | 'onboarding';
  isKid: boolean;
}

const label = [
  '뱅키즈 이용방법 보기',
  '다음',
  '다음',
  '다음',
  '뱅키즈 시작하기',
];

const GuideTemplate = ({ page, isKid }: GuideTemplateProps) => {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const navigate = useNavigate();
  const onExitButtonClick = () => {
    if (page === 'manage') {
      navigate('/mypage/manage');
    } else {
      navigate('/');
    }
  };

  const onNextButtonClick = () => {
    if (step === 4) {
      onExitButtonClick();
    } else {
      setStep((step + 1) as 0 | 1 | 2 | 3 | 4);
    }
  };

  const content = () => {
    if (step) {
      return <Step step={step} isKid={isKid} />;
    } else if (isKid && !step) {
      return <KidMain />;
    } else if (!isKid && !step) {
      return <ParentMain />;
    }
  };

  return (
    <Wrapper>
      <div onClick={onExitButtonClick} className="exit">
        <Exit />
      </div>
      <div className="progress">
        {step !== 0 && <Progress step={step} skipSelectParents={true} />}
      </div>
      <SlideTransition keyValue={step} direction={'next'}>
        <ContentWrapper>{content()}</ContentWrapper>
      </SlideTransition>
      <SheetButton
        onClickNext={onNextButtonClick}
        label={label[step]}
        disabledNext={false}
        outerSheet={true}
      />
    </Wrapper>
  );
};

export default GuideTemplate;

const Wrapper = styled.div`
  margin-top: 64px;
  width: 100vw;
  .exit {
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 6px;
    z-index: 3;
  }
  .progress {
    & > div {
      margin: 0 auto;
    }
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 80px);
`;
