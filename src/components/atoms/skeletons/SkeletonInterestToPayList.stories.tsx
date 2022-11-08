import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonInterestToPayList from './SkeletonInterestToPayList';

export default {
  title: 'skeletons/SkeletonInterestToPayList',
  component: SkeletonInterestToPayList,
} as ComponentMeta<typeof SkeletonInterestToPayList>;

const Template: ComponentStory<typeof SkeletonInterestToPayList> = () => (
  <SkeletonInterestToPayList />
);

export const 지급이_필요한_이자 = Template.bind({});
지급이_필요한_이자.args = {};
