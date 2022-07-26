import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import EmptyWalkingMoneyRoad from './EmptyWalkingMoneyRoad';

export default {
  title: '자녀/홈/EmptyWalkingMoneyRoad',
  component: EmptyWalkingMoneyRoad,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof EmptyWalkingMoneyRoad>;

const Template: ComponentStory<typeof EmptyWalkingMoneyRoad> = (args) => (
  <EmptyWalkingMoneyRoad {...args} />
);

export const 예시 = Template.bind({});
