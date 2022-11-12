import { ComponentStory, ComponentMeta } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import QuaternaryModal from './QuaternaryModal';

export default {
  title: 'modals/QuaternaryModal',
  component: QuaternaryModal,
  decorators: [(Story) => <Story />],
  argTypes: {
    onSubmit: { action: 'handle submit' },
    onExtraSubmit: { action: 'handle extra submit' },
  },
  parameters: {
    backgrounds: {
      values: [{ name: 'black', value: '#FAFAFC' }],
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
} as ComponentMeta<typeof QuaternaryModal>;

const Template: ComponentStory<typeof QuaternaryModal> = (args) => (
  <QuaternaryModal {...args} />
);

export const Example = Template.bind({});
Example.args = {
  interestPrice: 3000,
  title: '에어팟 사기',
  weeks: 3,
  successWeeks: 2,
};
