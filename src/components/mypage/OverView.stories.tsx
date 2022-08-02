import { ComponentStory, ComponentMeta } from '@storybook/react';
import OverView from './OverView';

export default {
  title: 'mypage/OverView',
  component: OverView,
  argTypes: {},
} as ComponentMeta<typeof OverView>;

const Template: ComponentStory<typeof OverView> = (args) => (
  <OverView {...args} />
);

export const 부모 = Template.bind({});
부모.args = {
  isKid: false,
};

export const 자녀 = Template.bind({});
자녀.args = {
  isKid: true,
};
