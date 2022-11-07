import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonSummary from './SkeletonSummary';

export default {
  title: 'atoms/skeletons/SkeletonSummary',
  component: SkeletonSummary,
} as ComponentMeta<typeof SkeletonSummary>;

const Template: ComponentStory<typeof SkeletonSummary> = (args) => (
  <SkeletonSummary {...args} />
);

export const 자녀_홈 = Template.bind({});
자녀_홈.args = {
  variant: 'KidHome',
};

export const 부모_홈 = Template.bind({});
부모_홈.args = {
  variant: 'ParentHome',
};
