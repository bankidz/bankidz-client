import { ComponentStory, ComponentMeta } from '@storybook/react';
import SwipeToWalk from './SwipeToWalk';

export default {
  title: 'walk/WalkingItemNameButton',
  component: SwipeToWalk,
  decorators: [
    (Story) => (
      <div style={{ margin: '18px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SwipeToWalk>;

const Template: ComponentStory<typeof SwipeToWalk> = (args) => (
  <SwipeToWalk {...args} />
);

export const _default = Template.bind({});
_default.args = {};
