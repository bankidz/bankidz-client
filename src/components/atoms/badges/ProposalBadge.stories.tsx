import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import ProposalBadge from './ProposalBadge';

export default {
  title: 'badges/ProposalBadge',
  component: ProposalBadge,
} as ComponentMeta<typeof ProposalBadge>;

const Template: ComponentStory<typeof ProposalBadge> = () => (
  <Wrapper>
    <ProposalBadge isProposing />
    <ProposalBadge isProposing={false} />
  </Wrapper>
);

const Wrapper = styled.div`
  div + div {
    margin-top: 10px;
  }
`;

export const Variants = Template.bind({});
