import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import Summary from './Summary';

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
  usage: 'KidHome',
  currentSavings: 10000,
  totalPrice: 150000,
};

export const 걷고있는_돈길 = Template.bind({});
걷고있는_돈길.args = {
  usage: 'Walking',
  currentSavings: 10000,
  totalPrice: 150000,
};

export const 부모_홈 = Template.bind({});
부모_홈.args = {
  usage: 'ParentHome',
  currentSavings: 10000,
  totalPrice: 150000,
  username: '신성우',
};
