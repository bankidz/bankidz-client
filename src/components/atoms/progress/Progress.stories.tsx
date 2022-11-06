import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress from './Progress';

export default {
  title: 'home/create/progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const 부모선택_건너뛰기 = Template.bind({});
부모선택_건너뛰기.args = {
  step: 3,
  skipSelectParents: true,
};

export const 부모선택_포함 = Template.bind({});
부모선택_포함.args = {
  step: 3,
  skipSelectParents: false,
};
