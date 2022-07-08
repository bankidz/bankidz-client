import { ComponentStory, ComponentMeta } from '@storybook/react';
import TargetBadge from './TargetBadge';

export default {
  title: '챌린지 모아보기/TargetBadge',
  component: TargetBadge,
} as ComponentMeta<typeof TargetBadge>;

const Template: ComponentStory<typeof TargetBadge> = (args) => (
  <TargetBadge {...args} />
);

export const 목표저축액_100000원 = Template.bind({});
목표저축액_100000원.args = {
  targetSaving: 100000,
};
