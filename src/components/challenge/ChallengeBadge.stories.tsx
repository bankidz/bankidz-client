import { ComponentStory, ComponentMeta } from '@storybook/react';
import ChallengeBadge from './ChallengeBadge';

export default {
  title: 'challenge/ChallengeBadge',
  component: ChallengeBadge,
} as ComponentMeta<typeof ChallengeBadge>;

const Template: ComponentStory<typeof ChallengeBadge> = (args) => (
  <ChallengeBadge {...args} />
);

export const temp = Template.bind({});
temp.args = {
  targetSaving: 100000,
  interestRate: 10
};
