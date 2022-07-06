import { ComponentStory, ComponentMeta } from '@storybook/react';
import TargetBadge from './TargetBadge';

export default {
  title: 'challenge/TargetBadge',
  component: TargetBadge,
} as ComponentMeta<typeof TargetBadge>;

const Template: ComponentStory<typeof TargetBadge> = (args) => (
  <TargetBadge {...args} />
);

export const temThousandWon = Template.bind({});
temThousandWon.args = {
  targetSaving: 100000,
};
