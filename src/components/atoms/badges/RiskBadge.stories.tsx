import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import RiskBadge from './RiskBadge';

export default {
  title: 'atoms/badges/RiskBadge',
  component: RiskBadge,
} as ComponentMeta<typeof RiskBadge>;

const Template: ComponentStory<typeof RiskBadge> = () => (
  <Wrapper>
    <RiskBadge riskLevel="위험" />
    <RiskBadge riskLevel="보통" />
    <RiskBadge riskLevel="안정" />
  </Wrapper>
);

const Wrapper = styled.div`
  div + div {
    margin-top: 10px;
  }
`;

export const Variants = Template.bind({});
