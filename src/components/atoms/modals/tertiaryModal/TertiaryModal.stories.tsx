import { ComponentStory, ComponentMeta } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import TertiaryModal from './TertiaryModal';

export default {
  title: 'atoms/modals/TertiaryModal',
  component: TertiaryModal,
  decorators: [(Story) => <Story />],
  argTypes: {
    onSubmit: { action: 'handle click' },
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
} as ComponentMeta<typeof TertiaryModal>;

const Template: ComponentStory<typeof TertiaryModal> = (args) => (
  <TertiaryModal {...args} />
);

export const 이자란 = Template.bind({});
