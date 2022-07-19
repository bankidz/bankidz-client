import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Step1 from '@components/kid/create/content/Step1';
import Step2 from '@components/kid/create/content/Step2';
import Progress from '@components/kid/create/Progress';
import MarginTemplate from '@components/layout/MarginTemplate';
import Step3 from '@components/kid/create/content/Step3';
import Step4 from '@components/kid/create/content/Step4';
import { useEffect, useState } from 'react';
import { TFamilyState } from '@lib/types/family';
import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import Step5 from '@components/kid/create/content/Step5';
import { useAppDispatch } from '@store/app/hooks';
import { dispatchParent } from '@store/slices/challengePayloadSlice';

const title = [
  '누구와 계약하나요?',
  '계약 상품이 무엇인가요?',
  '이름과 목표 금액을 정해요',
  '매주 얼마를 모을까요?',
  <>
    <p>멋진 사인으로</p>
    <p>부모님께 계약서를 보내요</p>
  </>,
];

function CreateKid() {
  const { step } = useParams();
  const [parents, setParents] = useState<TFamilyState[]>();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  const getTypedStep = (parsedStep: number) => {
    if (step && parsedStep > 0 && parsedStep <= 5) {
      return parsedStep as 1 | 2 | 3 | 4 | 5;
    } else {
      throw 'step error';
    }
  };

  // 부모 정보 가져오기
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get('/family');
        const responseData: TFamilyState[] = response.data.data.familyUserList;
        const parents = responseData.filter((v) => v.isKid === false);
        if (parents.length === 1) {
          dispatch(dispatchParent(parents[0].isFemale));
        }
        setParents(parents);
      } catch (e) {
        alert('서버 통신 오류');
      }
    }
    fetchData();
  }, []);

  const renderContent = (typedStep: 1 | 2 | 3 | 4 | 5) => {
    if (parents?.length === 1) {
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
      {parents ? (
        <>
          {step && (
            <>
              <Progress
                step={getTypedStep(parseInt(step))}
                skipSelectParents={parents?.length === 1 ? true : false}
              />
              <MarginTemplate>
                <h1>
                  {parents.length === 1
                    ? title[parseInt(step)]
                    : title[parseInt(step) - 1]}
                </h1>
                {renderContent(getTypedStep(parseInt(step)))}
              </MarginTemplate>
            </>
          )}
        </>
      ) : (
        <>가족정보 가져오는중</>
      )}
    </Wrapper>
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

    ${({ theme }) => theme.typo.input.Title_T_24_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    white-space: pre-wrap;

    /* paragraph-spacing 대용 */
    & > p:last-child {
      margin-top: 10px;
    }
  }
`;
