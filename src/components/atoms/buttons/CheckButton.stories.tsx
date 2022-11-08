import { ComponentStory, ComponentMeta } from '@storybook/react';
import CheckButton from './CheckButton';

export default {
  title: 'buttons/CheckButton',
  component: CheckButton,
  argTypes: {
    onClick: { action: 'handle click' },
  },
} as ComponentMeta<typeof CheckButton>;

const Template: ComponentStory<typeof CheckButton> = (args) => (
  <CheckButton {...args} />
);

export const Example = Template.bind({});
