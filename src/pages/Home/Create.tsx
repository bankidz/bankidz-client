import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Step1 from '@components/home/create/steps/Step1';
import Step2 from '@components/home/create/steps/Step2';
import Progress from '@components/home/create/Progress';
import MarginTemplate from '@components/layout/MarginTemplate';
import Step3 from '@components/home/create/steps/Step3';
import Step4 from '@components/home/create/steps/Step4';
import Step5 from '@components/home/create/steps/Step5';
import { useQuery } from 'react-query';
import { FAMILY } from '@lib/constants/QUERY_KEY';
import useFamilyApi from '@apis/family/useFamilyApi';

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
  const { step } = useParams();
  const { getFamily } = useFamilyApi();
  const { data: familyData, status } = useQuery(FAMILY, getFamily);
  const parents = familyData?.familyUserList.filter((member) => !member.isKid);
  const isCouple = parents?.length === 1;

  const getTypedStep = (parsedStep: number) => {
    if (step && parsedStep > 0 && parsedStep <= 5) {
      return parsedStep as 1 | 2 | 3 | 4 | 5;
    } else {
      throw 'step error';
    }
  };

  const renderContent = (typedStep: 1 | 2 | 3 | 4 | 5) => {
    if (isCouple) {
      switch (typedStep) {
        case 1:
          return <Step2 currentStep={1} />;
        case 2:
          return <Step3 currentStep={2} />;
        case 3:
          return <Step4 currentStep={3} />;
        case 4:
          return <Step5 currentStep={4} />;
        case 5:
          return <Navigate to="/create/1" />;
      }
    } else {
      switch (typedStep) {
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
      }
    }
  };

  return (
    <Wrapper>
      {step && (
        <>
          <Progress
            step={getTypedStep(parseInt(step))}
            skipSelectParents={status === 'success' && isCouple ? true : false}
          />
          <MarginTemplate>
            {status === 'success' && isCouple
              ? title[parseInt(step)]
              : title[parseInt(step) - 1]}
            {renderContent(getTypedStep(parseInt(step)))}
          </MarginTemplate>
        </>
      )}
    </Wrapper>
  );
}

export default Create;

const Wrapper = styled.div`
  margin-top: 16px;

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
