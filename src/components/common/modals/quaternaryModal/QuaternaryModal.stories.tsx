import { ComponentStory, ComponentMeta } from '@storybook/react';
import QuaternaryModal from './QuaternaryModal';

export default {
  title: 'Common/모달/QuaternaryModal',
  component: QuaternaryModal,
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
} as ComponentMeta<typeof QuaternaryModal>;

const Template: ComponentStory<typeof QuaternaryModal> = (args) => (
  <QuaternaryModal {...args} />
);

export const 자녀 = Template.bind({});
자녀.args = {
  createdAt: '2022-07-05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
};

export const 부모 = Template.bind({});
부모.args = {
  createdAt: '2022-07-05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
  isKid: false,
};
