import SheetButton from '@components/common/buttons/SheetButton';
import Progress from '@components/home/create/Progress';
import styled from 'styled-components';
import { ReactComponent as Exit } from '@assets/icons/exit.svg';
import { useNavigate } from 'react-router-dom';
interface GuideTemplateProps {
  page: 'manage' | 'onboarding';
  step: 0 | 1 | 2 | 3 | 4;
}

const label = [
  '뱅키즈 이용방법 보기',
  '다음',
  '다음',
  '다음',
  '뱅키즈 시작하기',
];

const GuideTemplate = ({ page, step }: GuideTemplateProps) => {
  const navigate = useNavigate();
  const onExitButtonClick = () => {
    if (page === 'manage') {
      navigate('/manage');
    } else {
      navigate('/');
    }
  };

  return (
    <Wrapper>
      <div onClick={onExitButtonClick} className="exit">
        <Exit />
      </div>
      {step !== 0 && <Progress step={step} skipSelectParents={true} />}
      <SheetButton
        onClickNext={() => {}}
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
  .exit {
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 6px;
    z-index: 3;
  }
  & > div:nth-child(2) {
    margin: 0 auto;
  }
`;
