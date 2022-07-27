import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmptyPendingMoneyRoad from './EmptyPendingMoneyRoad';
import MarginTemplate from '@components/layout/MarginTemplate';

export default {
  title: '자녀/홈/EmptyPendingMoneyRoad',
  component: EmptyPendingMoneyRoad,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof EmptyPendingMoneyRoad>;

const Template: ComponentStory<typeof EmptyPendingMoneyRoad> = (args) => (
  <EmptyPendingMoneyRoad />
);

export const 예시 = Template.bind({});
