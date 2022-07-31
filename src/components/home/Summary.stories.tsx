import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import Summary from './Summary';

export default {
  title: '자녀/홈/Summary',
  component: Summary,
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof Summary>;

const Template: ComponentStory<typeof Summary> = (args) => (
  <Summary {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  currentSavings: 10000,
  totalPrice: 150000,
};
