import { ComponentStory, ComponentMeta } from '@storybook/react';
import WalkingItemNameButton from './WalkingItemNameButton';

export default {
  title: '돈길 걷기/WalkingItemNameButton',
  component: WalkingItemNameButton,
  decorators: [
    (Story) => (
      <div style={{ margin: '18px' }}>
        <Story />
      </div>
    ),
  ],
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

export const noticed_default = Template.bind({});
noticed_default.args = {
  itemName: '학용품',
  isSelected: false,
  isNoticed: true,
};

export const noticed_selected = Template.bind({});
noticed_selected.args = {
  itemName: '학용품',
  isSelected: true,
  isNoticed: true,
};
