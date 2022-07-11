import { ComponentStory, ComponentMeta } from '@storybook/react';
import InterestBadge from './InterestBadge';

export default {
  title: 'Common/뱃지/InterestBadge',
  component: InterestBadge,
} as ComponentMeta<typeof InterestBadge>;

const Template: ComponentStory<typeof InterestBadge> = (args) => (
  <InterestBadge {...args} />
);

export const 이자율_10퍼센트 = Template.bind({});
이자율_10퍼센트.args = {
  interestRate: 10,
};

export const 이자율_20퍼센트 = Template.bind({});
이자율_20퍼센트.args = {
  interestRate: 20,
};

export const 이자율_30퍼센트 = Template.bind({});
이자율_30퍼센트.args = {
  interestRate: 30,
};
