import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProposalBadge from './ProposalBadge';

export default {
  title: 'atoms/badges/ProposalBadge',
  component: ProposalBadge,
} as ComponentMeta<typeof ProposalBadge>;

const Template: ComponentStory<typeof ProposalBadge> = (args) => (
  <ProposalBadge {...args} />
);

export const 상태_제안중 = Template.bind({});
상태_제안중.args = {
  isProposing: true,
};

export const 상태_거절됨 = Template.bind({});
상태_거절됨.args = {
  isProposing: false,
};
