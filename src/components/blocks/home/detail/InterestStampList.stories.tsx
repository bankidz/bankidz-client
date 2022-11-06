import { ComponentStory, ComponentMeta } from '@storybook/react';
import InterestStampList from './InterestStampList';

export default {
  title: 'home/detail/InterestStampList',
  component: InterestStampList,
} as ComponentMeta<typeof InterestStampList>;

const Template: ComponentStory<typeof InterestStampList> = (args) => (
  <InterestStampList {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  weeks: 13,
  stamps: [
    {
      challengeId: 8,
      weeks: 1,
      isAchieved: true,
    },
    {
      challengeId: 8,
      weeks: 2,
      isAchieved: true,
    },
    {
      challengeId: 8,
      weeks: 3,
      isAchieved: false,
    },
    {
      challengeId: 8,
      weeks: 4,
      isAchieved: true,
    },
    {
      challengeId: 8,
      weeks: 5,
      isAchieved: false,
    },
    {
      challengeId: 8,
      weeks: 6,
      isAchieved: false,
    },
  ],
};
