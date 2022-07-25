import { TMoneyRoadStatus } from '@lib/types/kid';
import styled from 'styled-components';
import WaitingChallengeItem from './WaitingChallengeItem';

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
    id: 10,
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
    id: 11,
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

function WaitingMoneyRoadList() {
  return (
    <Wrapper>
      {challenges.map((challenge) => (
        <WaitingChallengeItem
          key={challenge.id}
          title={challenge.title}
          createdAt={challenge.createdAt}
          status={challenge.status as TMoneyRoadStatus}
        />
      ))}
    </Wrapper>
  );
}

export default WaitingMoneyRoadList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
