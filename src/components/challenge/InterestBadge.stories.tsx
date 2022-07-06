import { ComponentStory, ComponentMeta } from '@storybook/react';
import InterestBadge from './InterestBadge';

export default {
  title: 'challenge/InterestBadge',
  component: InterestBadge,
} as ComponentMeta<typeof InterestBadge>;

const Template: ComponentStory<typeof InterestBadge> = (args) => (
  <InterestBadge {...args} />
);

export const temPercent = Template.bind({});
temPercent.args = {
  interestRate: 10,
};
