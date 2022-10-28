import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import WalkingDongilItem from './WalkingDongilItem';

export default {
  title: 'home/walking/WalkingDongilItem',
  component: WalkingDongilItem,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof WalkingDongilItem>;

const Template: ComponentStory<typeof WalkingDongilItem> = (args) => (
  <WalkingDongilItem {...args} />
);

export const 완구_퍼펙트걸_되기 = Template.bind({});
완구_퍼펙트걸_되기.args = {
  itemName: '학용품',
  title: '완구 퍼펙트걸 되기',
  id: 2,
  challengeStatus: 'WALKING',
  interestRate: 20,
};

export const 프리페라 = Template.bind({});
프리페라.args = {
  itemName: '패션뷰티',
  title: '프리페라 세트 사기',
  id: 2,
  challengeStatus: 'FAILED',
  interestRate: 30,
};
