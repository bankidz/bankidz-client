import { ComponentStory, ComponentMeta } from '@storybook/react';
import InterestStamp from './InterestStampList';

export default {
  title: 'home/walking/InterestStamp',
  component: InterestStamp,
} as ComponentMeta<typeof InterestStamp>;

const Template: ComponentStory<typeof InterestStamp> = (args) => (
  <InterestStamp {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  weeks: 13,
  stemp: [
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
