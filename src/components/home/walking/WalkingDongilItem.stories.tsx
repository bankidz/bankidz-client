import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import WalkingDongilItem from './WalkingDongilItem';

export default {
  title: '자녀/홈/WalkingDongilItem',
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

export const 핸드폰_케이스_사기 = Template.bind({});
핸드폰_케이스_사기.args = {
  itemName: '전자제품',
  title: '핸드폰 케이스 사기',
};

export const 완구_퍼펙트걸_되기 = Template.bind({});
완구_퍼펙트걸_되기.args = {
  itemName: '학용품',
  title: '완구 퍼펙트걸 되기',
};
