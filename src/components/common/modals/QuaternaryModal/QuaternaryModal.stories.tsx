import { ComponentStory, ComponentMeta } from '@storybook/react';
import QuaternaryModal from './QuaternaryModal';

export default {
  title: 'common/modals/QuaternaryModal',
  component: QuaternaryModal,
  decorators: [(Story) => <Story />],
  argTypes: {
    onSubmit: { action: 'handle submit' },
    onExtraSubmit: { action: 'handle extra submit' },
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
