import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProposedDongilItem from './ProposedDongilItem';
import MarginTemplate from '@components/layout/MarginTemplate';
import { EDongilStatus } from '@lib/types/common';

export default {
  title: 'home/proposed/ProposedDongilItem',
  component: ProposedDongilItem,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof ProposedDongilItem>;

const Template: ComponentStory<typeof ProposedDongilItem> = (args) => (
  <ProposedDongilItem {...args} />
);

export const 제안중 = Template.bind({});
제안중.args = {
  proposedDongil: {
    id: 8,
    isMom: true,
    title: 'FE Mock) 아이패드 사기',
    itemName: '전자제품',
    challengeCategory: '이자율 받기',
    isAchieved: 1,
    interestRate: 10,
    totalPrice: 150000,
    weekPrice: 10000,
    successWeeks: 0,
    weeks: 15,
    createdAt: '2022-07-14 03:28:29',
    status: EDongilStatus.REJECTED,
    progressList: [
      {
        challengeId: 8,
        weeks: 1,
        isAchieved: false,
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
  proposedDongil: {
    id: 8,
    isMom: true,
    title: 'FE Mock) 아이패드 사기',
    itemName: '전자제품',
    challengeCategory: '이자율 받기',
    isAchieved: 1,
    interestRate: 10,
    totalPrice: 150000,
    weekPrice: 10000,
    successWeeks: 0,
    weeks: 15,
    createdAt: '2022-07-14 03:28:29',
    status: EDongilStatus.REJECTED,
    progressList: [
      {
        challengeId: 8,
        weeks: 1,
        isAchieved: false,
      },
    ],
    comment: {
      content: '큰 이자를 줄만한 목표가 아닌것 같다~',
      id: 0,
    },
  },
};
