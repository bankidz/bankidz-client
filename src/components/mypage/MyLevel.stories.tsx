import { ComponentStory, ComponentMeta } from '@storybook/react';
import MyLevel from './MyLevel';

export default {
  title: 'mypage/MyLevel',
  component: MyLevel,
  argTypes: {},
} as ComponentMeta<typeof MyLevel>;

const Template: ComponentStory<typeof MyLevel> = (args) => (
  <MyLevel {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  achievedChallenge: 10,
};
