import { ComponentStory, ComponentMeta } from '@storybook/react';
import CloseButton from './CloseButton';

export default {
  title: 'Common/버튼/CloseButton',
  component: CloseButton,
  argTypes: {
    onClick: { action: 'handle close' },
  },
} as ComponentMeta<typeof CloseButton>;

const Template: ComponentStory<typeof CloseButton> = (args) => (
  <CloseButton {...args} />
);

export const 예시 = Template.bind({});
