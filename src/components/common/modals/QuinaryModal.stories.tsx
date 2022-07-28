import { ComponentStory, ComponentMeta } from '@storybook/react';
import QuinaryModal from './QuinaryModal';

export default {
  title: 'Common/모달/QuinaryModal',
  component: QuinaryModal,
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
} as ComponentMeta<typeof QuinaryModal>;

const Template: ComponentStory<typeof QuinaryModal> = (args) => (
  <QuinaryModal {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  createdAt: '2022-07-05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
};
