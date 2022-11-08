import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress from './Progress';

export default {
  title: 'etc/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const 부모선택_미포함 = Template.bind({});
부모선택_미포함.args = {
  step: 3,
  skipSelectParents: true,
};

export const 부모선택_포함 = Template.bind({});
부모선택_포함.args = {
  step: 3,
  skipSelectParents: false,
};
