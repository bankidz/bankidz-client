import { ComponentStory, ComponentMeta } from '@storybook/react';
import CloseButton from './CloseButton';

export default {
  title: 'buttons/CloseButton',
  component: CloseButton,
  argTypes: {
    onClick: { action: 'handle click' },
  },
} as ComponentMeta<typeof CloseButton>;

const Template: ComponentStory<typeof CloseButton> = (args) => (
  <CloseButton {...args} />
);

export const Example = Template.bind({});
