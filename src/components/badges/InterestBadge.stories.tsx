import { ComponentStory, ComponentMeta } from '@storybook/react';
import InterestBadge from './InterestBadge';

export default {
  title: 'badges/InterestBadge',
  component: InterestBadge,
} as ComponentMeta<typeof InterestBadge>;

const Template: ComponentStory<typeof InterestBadge> = (args) => (
  <InterestBadge {...args} />
);

export const tenPercent = Template.bind({});
tenPercent.args = {
  interestRate: 10,
};

export const twentyPercent = Template.bind({});
twentyPercent.args = {
  interestRate: 20,
};

export const thirtyPercent = Template.bind({});
thirtyPercent.args = {
  interestRate: 30,
};
