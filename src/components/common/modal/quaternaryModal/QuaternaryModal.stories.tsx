import { ComponentStory, ComponentMeta } from '@storybook/react';
import QuaternaryModal from './QuaternaryModal';

export default {
  title: '모달/QuaternaryModal',
  component: QuaternaryModal,
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
} as ComponentMeta<typeof QuaternaryModal>;

const Template: ComponentStory<typeof QuaternaryModal> = (args) => (
  <QuaternaryModal {...args} />
);

export const 완구퍼펙트걸_되기 = Template.bind({});
