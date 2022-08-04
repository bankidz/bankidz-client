import { ComponentStory, ComponentMeta } from '@storybook/react';
import SenaryModal from './SenaryModal';

export default {
  title: 'common/modals/SenaryModal',
  component: SenaryModal,
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
} as ComponentMeta<typeof SenaryModal>;

const Template: ComponentStory<typeof SenaryModal> = (args) => (
  <SenaryModal {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  createdAt: '2022/07/05 05:05:05',
  interestRate: 30,
  isMom: true,
  itemName: '전자제품',
  title: '에어팟 사기',
  totalPrice: 150000,
  weekPrice: 10000,
  weeks: 15,
  comment: '큰 이자를 줄만한 목표가 아닌것 같다~',
};
