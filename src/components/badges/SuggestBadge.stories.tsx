import { ComponentStory, ComponentMeta } from '@storybook/react';
import SuggestBadge from './SuggestBadge';

export default {
  title: 'badges/SuggestBadge',
  component: SuggestBadge,
} as ComponentMeta<typeof SuggestBadge>;

const Template: ComponentStory<typeof SuggestBadge> = (args) => (
  <SuggestBadge {...args} />
);

export const 제안중 = Template.bind({});
제안중.args = {
  isSuggesting: true,
};

export const 거절됨 = Template.bind({});
거절됨.args = {
  isSuggesting: false,
};
