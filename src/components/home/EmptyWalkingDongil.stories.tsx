import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmptyWalkingDongil from './walking/EmptyWalkingDongil';
import MarginTemplate from '@components/layout/MarginTemplate';

export default {
  title: 'home/EmptyWalkingDongil',
  component: EmptyWalkingDongil,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof EmptyWalkingDongil>;

const Template: ComponentStory<typeof EmptyWalkingDongil> = (args) => (
  <EmptyWalkingDongil {...args} />
);

export const 예시 = Template.bind({});
