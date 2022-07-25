import { TItemName } from '@lib/types/kid';
import styled from 'styled-components';
import WalkingChallengeItem from './WalkingChallengeItem';

const challenges = [
  {
    challengeCategory: '부모와 함께 하기',
    comment: {
      content: 'string',
      id: 0,
    },
    createdAt: '2022-07-05 05:05:05',
    id: 1,
    interestRate: 30,
    isAchieved: 1,
    isMom: true,
    itemName: '전자제품',
    progressList: true,
    status: 1,
    title: '에어팟 사기',
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
  },
  {
    challengeCategory: '부모와 함께 하기',
    comment: {
      content: 'string',
      id: 0,
    },
    createdAt: '2022-07-05 05:05:05',
    id: 2,
    interestRate: 30,
    isAchieved: 1,
    isMom: true,
    itemName: '전자제품',
    progressList: true,
    status: 1,
    title: '에어팟 사기',
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
  },
  {
    challengeCategory: '부모와 함께 하기',
    comment: {
      content: 'string',
      id: 0,
    },
    createdAt: '2022-07-05 05:05:05',
    id: 3,
    interestRate: 30,
    isAchieved: 1,
    isMom: true,
    itemName: '전자제품',
    progressList: true,
    status: 1,
    title: '에어팟 사기',
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
  },
];

function WalkingMoneyRoadList() {
  return (
    <Wrapper>
      {challenges.map((challenge) => (
        <WalkingChallengeItem
          key={challenge.id}
          itemName={challenge.itemName as TItemName}
          title={challenge.title}
        />
      ))}
    </Wrapper>
  );
}

export default WalkingMoneyRoadList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
