import { TItemName } from '@lib/types/kid';
import styled, { css } from 'styled-components';
import ChallengeItem from './ChallengeItem';
import { ReactComponent as Plus } from '@assets/icon/plus.svg';
import { ReactComponent as PlusCircle } from '@assets/icon/plus-circle.svg';
import { theme } from '@lib/styles/theme';

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
  const disable = false;
  const isInitial = false;
  return (
    <Wrapper>
      <span className="header">걷고있는 돈길</span>
      {/* @ts-expect-error */}
      {isInitial === true ? (
        <Initial>
          <button>
            <PlusCircle />
          </button>
          <span>새로운 돈길 계약하기</span>
        </Initial>
      ) : (
        <>
          {challenges.map((challenge) => (
            <ChallengeItem
              key={challenge.id}
              itemName={challenge.itemName as TItemName}
              title={challenge.title}
            />
          ))}
          <ContractNewMoneyRoadButton disable={disable}>
            <Plus
              stroke={
                // @ts-expect-error
                disable === true
                  ? theme.palette.greyScale.grey200
                  : theme.palette.main.yellow400
              }
            />
            새로운 돈길 계약하기
          </ContractNewMoneyRoadButton>
        </>
      )}
    </Wrapper>
  );
}

export default WalkingMoneyRoad;

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
    border-radius: 50%;
  }

  span {
    margin-top: 16px;
    ${({ theme }) => theme.typo.text.T_18_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

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

const ContractNewMoneyRoadButton = styled.button<{ disable: boolean }>`
  ${({ theme }) => theme.typo.button.Text_T_14_EB};
  ${({ disable }) =>
    disable === true
      ? css`
          color: ${({ theme }) => theme.palette.greyScale.grey200};
        `
      : css`
          color: ${({ theme }) => theme.palette.main.yellow400};
        `}

  width: 150px;
  height: 48px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  line-height: 16px;
  padding-left: 20px;

  position: relative;
  svg {
    position: absolute;
    transform: translate3d(0, -50%, 0);
    left: 0;
    top: 50%;
  }
`;
