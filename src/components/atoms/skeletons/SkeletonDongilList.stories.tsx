import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonDongilList from './SkeletonDongilList';

export default {
  title: 'atoms/skeletons/SkeletonDongilList',
  component: SkeletonDongilList,
} as ComponentMeta<typeof SkeletonDongilList>;

const Template: ComponentStory<typeof SkeletonDongilList> = (args) => (
  <SkeletonDongilList {...args} />
);

export const 걷고있는_돈길 = Template.bind({});
걷고있는_돈길.args = {
  variant: 'walking',
};

export const 대기중인_돈길 = Template.bind({});
대기중인_돈길.args = {
  variant: 'proposed',
};

export const 제안받은_돈길 = Template.bind({});
제안받은_돈길.args = {
  variant: 'proposed',
};

export const 금주의_돈길 = Template.bind({});
금주의_돈길.args = {
  variant: 'thisWeekS',
};
