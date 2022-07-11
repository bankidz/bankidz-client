import { ComponentStory, ComponentMeta } from '@storybook/react';
import InstructionBadge from './InstructionBadge';

export default {
  title: 'Common/뱃지/InstructionBadge',
  component: InstructionBadge,
} as ComponentMeta<typeof InstructionBadge>;

const Template: ComponentStory<typeof InstructionBadge> = (args) => (
  <InstructionBadge {...args} />
);

export const 내용_10주 = Template.bind({});
내용_10주.args = {
  property: 'primary',
  children: '10주',
};

export const 내용_5000원 = Template.bind({});
내용_5000원.args = {
  property: 'secondary',
  children: '5,000원',
};

export const 내용_500원 = Template.bind({});
내용_500원.args = {
  property: 'tertiary',
  children: '500원',
};
