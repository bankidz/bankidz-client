import { ComponentStory, ComponentMeta } from '@storybook/react';
import Receipt from './Receipt';

export default {
  title: 'Common/Receipt',
  component: Receipt,
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
} as ComponentMeta<typeof Receipt>;

const Template: ComponentStory<typeof Receipt> = (args) => (
  <Receipt {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  createdAt: '2022-07-05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
};
