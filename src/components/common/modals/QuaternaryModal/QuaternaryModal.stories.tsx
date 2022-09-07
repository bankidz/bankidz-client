import { ComponentStory, ComponentMeta } from '@storybook/react';
import QuaternaryModal from './QuaternaryModal';

export default {
  title: 'common/modals/QuaternaryModal',
  component: QuaternaryModal,
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
} as ComponentMeta<typeof QuaternaryModal>;

const Template: ComponentStory<typeof QuaternaryModal> = (args) => (
  <QuaternaryModal {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  interestPrice: 3000,
  title: '에어팟 사기',
  weeks: 3,
  successWeeks: 2,
};
