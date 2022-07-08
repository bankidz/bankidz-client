import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProfileButton from './ProfileButton';

export default {
  title: '온보딩/ProfileButton',
  component: ProfileButton,
  argTypes: {
    onClick: { action: 'set role' },
  },
} as ComponentMeta<typeof ProfileButton>;

const Template: ComponentStory<typeof ProfileButton> = (args) => (
  <ProfileButton {...args} />
);

export const 역할_아빠 = Template.bind({});
역할_아빠.args = {
  role: '아빠',
};

export const 역할_엄마 = Template.bind({});
역할_엄마.args = {
  role: '엄마',
};

export const 역할_아들 = Template.bind({});
역할_아들.args = {
  role: '아들',
};

export const 역할_딸 = Template.bind({});
역할_딸.args = {
  role: '딸',
};
