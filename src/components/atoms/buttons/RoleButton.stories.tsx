import { ComponentStory, ComponentMeta } from '@storybook/react';
import RoleButton from './RoleButton';

export default {
  title: 'atoms/buttons/RoleButton',
  component: RoleButton,
  argTypes: {
    onClick: { action: 'handle click' },
  },
} as ComponentMeta<typeof RoleButton>;

const Template: ComponentStory<typeof RoleButton> = (args) => (
  <RoleButton {...args} />
);

export const 역할_딸 = Template.bind({});
역할_딸.args = {
  isKid: true,
  isFemale: true,
};

export const 역할_아들 = Template.bind({});
역할_아들.args = {
  isKid: true,
  isFemale: false,
};

export const 역할_엄마 = Template.bind({});
역할_엄마.args = {
  isKid: false,
  isFemale: true,
};

export const 역할_아빠 = Template.bind({});
역할_아빠.args = {
  isKid: false,
  isFemale: false,
};
