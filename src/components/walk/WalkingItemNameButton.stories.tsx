import { ComponentStory, ComponentMeta } from '@storybook/react';
import WalkingItemNameButton from './WalkingItemNameButton';

export default {
  title: '돈길 걷기/WalkingItemNameButton',
  component: WalkingItemNameButton,
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof WalkingItemNameButton>;

const Template: ComponentStory<typeof WalkingItemNameButton> = (args) => (
  <WalkingItemNameButton {...args} />
);

export const _default = Template.bind({});
_default.args = {
  itemName: '학용품',
};

export const selected = Template.bind({});
selected.args = {
  itemName: '학용품',
  isSelected: true,
};
