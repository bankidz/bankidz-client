import styled from 'styled-components';
import renderImage from './renderImage';
interface StepProps {
  step: 1 | 2 | 3 | 4;
  isKid: boolean;
}

const Step = ({ step, isKid }: StepProps) => {
  return (
    <Wrapper>
      <Title>
        <div>{isKid ? kid[step].sub : parent[step].sub}</div>
        <div>{isKid ? kid[step].main : parent[step].main}</div>
      </Title>
      {renderImage(isKid, step)}
    </Wrapper>
  );
};
export default Step;

const Wrapper = styled.div`
  margin-top: 48px;
  img {
    box-sizing: border-box;
    width: 100%;
    padding: 0 8px;
  }

  .true-1 {
    margin-top: 30px;
  }
  .true-2 {
    margin-top: 52px;
  }
  .true-3 {
    margin-top: 62px;
  }
  .true-4 {
    margin-top: 34px;
  }
`;

const Title = styled.div`
  padding: 0 26px;
  & > div:first-child {
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-bottom: 16px;
  }
  & > div:last-child {
    ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    span {
      color: ${({ theme }) => theme.palette.main.yellow400};
    }
    p:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

/* 자녀 서비스 이용방법 */
const kid = [
  {},
  {
    sub: '가족코드를 통한 가족 초대!',
    main: (
      <>
        <p>가족그룹이 생성된 후에</p>
        <p>
          <span>돈길을 계약</span>할 수 있어요
        </p>
      </>
    ),
  },
  {
    sub: '돈길 만들고 제안!',
    main: (
      <>
        <p>
          원하는 대로 <span>돈길을 만들고</span>
        </p>
        <p>
          부모님께 <span>보상을 제안</span>해요
        </p>
      </>
    ),
  },
  {
    sub: '매 주 돈길 걷기!',
    main: (
      <>
        <p>저금통이나 부모를 통해</p>
        <p>
          돈을 모은후, <span>돈길을 걸어요</span>
        </p>
      </>
    ),
  },
  {
    sub: '실시간 저금현황 확인!',
    main: (
      <>
        <p>앱 저금통에서</p>
        <p>
          <span>1주</span> 동안 모아야하는
        </p>
        <p>
          <span>전체 저금액을 확인</span>해요
        </p>
      </>
    ),
  },
];

/* 부모 서비스 이용방법 */
const parent = [
  {},
  {
    sub: '가족코드를 통한 가족 초대!',
    main: (
      <>
        <p>가족그룹이 생성된 후에</p>
        <p>
          <span>돈길을 계약</span>할 수 있어요
        </p>
      </>
    ),
  },
  {
    sub: '돈길 수락 및 거절!',
    main: (
      <>
        <p>
          <span>자녀가 제안한 돈길</span>을
        </p>
        <p>확인하고, 수락해주세요!</p>
      </>
    ),
  },
  {
    sub: '자녀의 저축현황 확인!',
    main: (
      <>
        <p>
          자녀가 실제로 <span>잘 모으고</span>
        </p>
        <p>
          <span>있는지 확인</span>해주세요
        </p>
      </>
    ),
  },
  {
    sub: '자녀에게 이자보상 주기!',
    main: (
      <>
        <p>자녀가 돈길을 완주하면</p>
        <p>
          <span>이자를 제공</span>하세요
        </p>
      </>
    ),
  },
];
