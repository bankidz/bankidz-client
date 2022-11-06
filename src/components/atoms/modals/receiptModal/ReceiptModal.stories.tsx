import { ComponentStory, ComponentMeta } from '@storybook/react';
import ReceiptModal from './ReceiptModal';

export default {
  title: 'common/modals/ReceiptModal',
  component: ReceiptModal,
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof ReceiptModal>;

const Template: ComponentStory<typeof ReceiptModal> = (args) => (
  <ReceiptModal {...args} />
);

export const contract = Template.bind({});
contract.args = {
  variant: 'contract',
  createdAt: '2022/07/05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
};

export const proposed = Template.bind({});
proposed.args = {
  variant: 'proposed',
  createdAt: '2022/07/05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
};

export const proposing = Template.bind({});
proposing.args = {
  variant: 'proposing',
  createdAt: '2022/07/05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
};

export const rejected = Template.bind({});
rejected.args = {
  variant: 'rejected',
  createdAt: '2022/07/05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
  comment: { content: '큰 이자를 줄만한 목표가 아닌것 같다~', id: 1 },
};
