import { ComponentStory, ComponentMeta } from '@storybook/react';
import PendingMoneyRoadItem from '../PendingMoneyRoad/PendingMoneyRoadItem';
import MarginTemplate from '@components/layout/MarginTemplate';
import { EMoneyRoadStatus } from '@lib/types/common';

export default {
  title: '자녀/홈/PendingMoneyRoadItem',
  component: PendingMoneyRoadItem,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof PendingMoneyRoadItem>;

const Template: ComponentStory<typeof PendingMoneyRoadItem> = (args) => (
  <PendingMoneyRoadItem {...args} />
);

export const 제안중 = Template.bind({});
제안중.args = {
  pendingMoneyRoad: {
    id: 8,
    isMom: true,
    title: 'FE Mock) 아이패드 사기',
    itemName: '전자제품',
    challengeCategoryName: '이자율 받기',
    isAchieved: false,
    interestRate: 10,
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
    createdAt: '2022-07-14 03:28:29',
    status: EMoneyRoadStatus.REJECTED,
    progressList: [
      {
        challengeId: 8,
        weeks: 1,
        isAchieved: false,
      },
    ],
    comment: null,
  },
};

export const 거절됨 = Template.bind({});
거절됨.args = {
  pendingMoneyRoad: {
    id: 8,
    isMom: true,
    title: 'FE Mock) 아이패드 사기',
    itemName: '전자제품',
    challengeCategoryName: '이자율 받기',
    isAchieved: false,
    interestRate: 10,
    totalPrice: 150000,
    weekPrice: 10000,
    weeks: 15,
    createdAt: '2022-07-14 03:28:29',
    status: EMoneyRoadStatus.REJECTED,
    progressList: [
      {
        challengeId: 8,
        weeks: 1,
        isAchieved: false,
      },
    ],
    comment: '큰 이자를 줄만한 목표가 아닌것 같다~',
  },
};
