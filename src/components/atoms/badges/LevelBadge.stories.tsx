import { ComponentStory, ComponentMeta } from '@storybook/react';
import LevelBadge from './LevelBadge';

export default {
  title: 'common/badges/LevelBadge',
  component: LevelBadge,
} as ComponentMeta<typeof LevelBadge>;

const Template: ComponentStory<typeof LevelBadge> = (args) => (
  <LevelBadge {...args} />
);

export const 레벨_1 = Template.bind({});
레벨_1.args = {
  level: 1,
};

export const 레벨_2 = Template.bind({});
레벨_2.args = {
  level: 2,
};

export const 레벨_3 = Template.bind({});
레벨_3.args = {
  level: 3,
};

export const 레벨_4 = Template.bind({});
레벨_4.args = {
  level: 4,
};

export const 레벨_5 = Template.bind({});
레벨_5.args = {
  level: 5,
};
