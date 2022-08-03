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
  user: {
    username: '한규진',
    isFemale: true,
    isKid: false,
    birthday: '',
    phone: null,
  },
};

export const 자녀 = Template.bind({});
자녀.args = {
  user: {
    username: '한규진',
    isFemale: true,
    isKid: true,
    birthday: '',
    phone: null,
  },
  overView: { achievedChallenge: 8, totalChallenge: 10, level: 2 },
};
