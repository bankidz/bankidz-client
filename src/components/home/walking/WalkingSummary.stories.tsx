import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import WalkingSummary from './WalkingSummary';

export default {
  title: '자녀/홈/WalkingSummary',
  component: WalkingSummary,
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof WalkingSummary>;

const Template: ComponentStory<typeof WalkingSummary> = (args) => (
  <WalkingSummary {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  currentSavings: 10000,
  totalPrice: 150000,
};
