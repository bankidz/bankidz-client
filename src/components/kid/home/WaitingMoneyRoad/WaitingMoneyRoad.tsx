import { TMoneyRoadStatus } from '@lib/types/kid';
import styled from 'styled-components';
import WaitingChallengeItem from './WaitingChallengeItem';
import { ReactComponent as BankiSad } from '@assets/illust/banki/banki_sad.svg';

const challenges = [
  {
    id: 9,
    isMom: true,
    title: '에어팟 사기',
    targetItemName: '전자제품',
    challengeCategoryName: '이자율 받기',
    isAchieved: false,
    interestRate: 30,
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
    createdAt: '2022-07-15 01:17:46',
    status: 1,
    progressList: null,
    comment: null,
  },
  {
    id: 9,
    isMom: true,
    title: '에어팟 사기',
    targetItemName: '전자제품',
    challengeCategoryName: '이자율 받기',
    isAchieved: false,
    interestRate: 30,
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
    createdAt: '2022-07-15 01:17:46',
    status: 1,
    progressList: null,
    comment: null,
  },
  {
    id: 9,
    isMom: true,
    title: '에어팟 사기',
    targetItemName: '전자제품',
    challengeCategoryName: '이자율 받기',
    isAchieved: false,
    interestRate: 30,
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
    createdAt: '2022-07-15 01:17:46',
    status: 1,
    progressList: null,
    comment: null,
  },
];

function WaitingMoneyRoad() {
  const disable = false;
  const isInitial = false;
  return (
    <Wrapper>
      <span className="header">대기중인 돈길</span>
      {/* @ts-expect-error */}
      {isInitial === true ? (
        <Initial>
          <button>
            <BankiSad />
          </button>
          <span>대기중인 돈길이 없어요</span>
        </Initial>
      ) : (
        <>
          {challenges.map((challenge) => (
            <WaitingChallengeItem
              key={challenge.id}
              title={challenge.title}
              createdAt={challenge.createdAt}
              status={challenge.status as TMoneyRoadStatus}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default WaitingMoneyRoad;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const Initial = styled.div`
  width: 100%;
  height: 162px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => theme.palette.greyScale.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 48px;
    height: 48px;
  }

  span {
    margin-top: 16px;
    ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M};
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
`;
