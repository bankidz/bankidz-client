import { ComponentStory, ComponentMeta } from '@storybook/react';
import SuggestBadge from './SuggestBadge';

export default {
  title: 'common/badges/SuggestBadge',
  component: SuggestBadge,
} as ComponentMeta<typeof SuggestBadge>;

const Template: ComponentStory<typeof SuggestBadge> = (args) => (
  <SuggestBadge {...args} />
);

export const 상태_제안중 = Template.bind({});
상태_제안중.args = {
  isSuggesting: true,
};

export const 상태_거절됨 = Template.bind({});
상태_거절됨.args = {
  isSuggesting: false,
};
