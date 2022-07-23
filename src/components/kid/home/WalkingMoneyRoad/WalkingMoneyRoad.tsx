import { TItemName } from '@lib/types/kid';
import Challenge from 'src/pages/Challenge/Challenge';
import styled from 'styled-components';
import ChallengeItem from './ChallengeItem';

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

function WalkingMoneyRoad() {
  return (
    <Wrapper>
      <span className="header">걷고있는 돈길</span>
      {challenges.map((challenge) => (
        <ChallengeItem
          key={challenge.id}
          itemName={challenge.itemName as TItemName}
          title={challenge.title}
        />
      ))}
      {/* <Button> 새로운 돈길 계약하기</Button> */}
    </Wrapper>
  );
}

export default WalkingMoneyRoad;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.button.Title_T_14_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const Button = styled.div<{ disable: boolean }>``;
