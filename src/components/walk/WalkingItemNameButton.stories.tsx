import { ComponentStory, ComponentMeta } from '@storybook/react';
import WalkingItemNameButton from './WalkingItemNameButton';

export default {
  title: '돈길 걷기/WalkingItemNameButton',
  component: WalkingItemNameButton,
  decorators: [
    (Story) => (
      <div style={{ width: '90px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof WalkingItemNameButton>;

const Template: ComponentStory<typeof WalkingItemNameButton> = (args) => (
  <WalkingItemNameButton {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  itemName: '학용품',
};
