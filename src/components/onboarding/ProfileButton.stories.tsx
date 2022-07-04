import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProfileButton from './ProfileButton';
import Margin from '../common/Margin';

export default {
  title: 'onboarding/ProfileButton',
  component: ProfileButton,
  argTypes: {
    onClick: { action: 'select' },
  },
  decorators: [
    (Story) => (
      <Margin>
        <Story />
      </Margin>
    ),
  ],
} as ComponentMeta<typeof ProfileButton>;

const Template: ComponentStory<typeof ProfileButton> = (args) => (
  <ProfileButton {...args} />
);

export const 아빠 = Template.bind({});
아빠.args = {
  role: '아빠',
};

export const 엄마 = Template.bind({});
엄마.args = {
  role: '엄마',
};

export const 아들 = Template.bind({});
아들.args = {
  role: '아들',
};

export const 딸 = Template.bind({});
딸.args = {
  role: '딸',
};
