import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonOverview from './SkeletonOverView';

export default {
  title: 'atoms/skeletons/SkeletonOverview',
  component: SkeletonOverview,
} as ComponentMeta<typeof SkeletonOverview>;

const Template: ComponentStory<typeof SkeletonOverview> = (args) => (
  <SkeletonOverview {...args} />
);

export const 자녀 = Template.bind({});
자녀.args = {
  isKid: true,
};

export const 부모 = Template.bind({});
부모.args = {
  isKid: false,
};
