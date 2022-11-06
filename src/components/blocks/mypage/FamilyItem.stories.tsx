import { ComponentStory, ComponentMeta } from '@storybook/react';
import FamilyItem from './FamilyItem';

export default {
  title: 'mypage/FamilyItem',
  component: FamilyItem,
  argTypes: {},
} as ComponentMeta<typeof FamilyItem>;

const Template: ComponentStory<typeof FamilyItem> = (args) => (
  <FamilyItem {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  user: { username: '한규진', isKid: true, isFemale: false },
};
