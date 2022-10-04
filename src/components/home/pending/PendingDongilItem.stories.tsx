import { ComponentStory, ComponentMeta } from '@storybook/react';
import PendingDongilItem from './PendingDongilItem';
import MarginTemplate from '@components/layout/MarginTemplate';

export default {
  title: 'home/pending/PendingDongilItem',
  component: PendingDongilItem,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof PendingDongilItem>;

const Template: ComponentStory<typeof PendingDongilItem> = (args) => (
  <PendingDongilItem {...args} />
);

export const 제안중 = Template.bind({});
제안중.args = {
  pendingDongil: {
    id: 8,
    isMom: true,
    title: 'FE Mock) 아이패드 사기',
    itemName: '전자제품',
    challengeCategory: '이자율 받기',
    challengeStatus: 'PENDING',
    interestRate: 10,
    interestPrice: 2000,
    totalPrice: 150000,
    weekPrice: 10000,
    successWeeks: 0,
    weeks: 15,
    createdAt: '2022/07/14 03:28:29',
    fileName: 'example',
    progressList: [
      {
        challengeStatus: 'REJECTED',
        challengeId: 8,
        weeks: 1,
        isAchieved: false,
        approvedAt: '2022/07/14 03:28:29',
      },
    ],
    comment: {
      content: '큰 이자를 줄만한 목표가 아닌것 같다~',
      id: 0,
    },
  },
};

export const 거절됨 = Template.bind({});
거절됨.args = {
  pendingDongil: {
    id: 8,
    isMom: true,
    title: 'FE Mock) 아이패드 사기',
    itemName: '전자제품',
    challengeCategory: '이자율 받기',
    challengeStatus: 'REJECTED',
    interestRate: 10,
    interestPrice: 2000,
    totalPrice: 150000,
    weekPrice: 10000,
    successWeeks: 0,
    weeks: 15,
    createdAt: '2022/07/14 03:28:29',
    fileName: 'example',
    progressList: [
      {
        challengeStatus: 'REJECTED',
        challengeId: 8,
        weeks: 1,
        isAchieved: false,
        approvedAt: '2022/07/14 03:28:29',
      },
    ],
    comment: {
      content: '큰 이자를 줄만한 목표가 아닌것 같다~',
      id: 0,
    },
  },
};
