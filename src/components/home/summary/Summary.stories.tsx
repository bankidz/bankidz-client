import { ComponentStory, ComponentMeta } from '@storybook/react';
import Summary from './Summary';
import MarginTemplate from '@components/layout/MarginTemplate';

export default {
  title: 'home/Summary',
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

export const 자녀_홈 = Template.bind({});
자녀_홈.args = {
  variant: 'KidHome',
  currentSavings: 10000,
  totalPrice: 150000,
};

export const 걷고있는_돈길 = Template.bind({});
걷고있는_돈길.args = {
  variant: 'Detail',
  currentSavings: 10000,
  totalPrice: 150000,
};

export const 부모_홈 = Template.bind({});
부모_홈.args = {
  variant: 'ParentHome',
  currentSavings: 10000,
  totalPrice: 150000,
};
