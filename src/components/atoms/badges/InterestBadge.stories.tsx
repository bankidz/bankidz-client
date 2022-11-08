import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import InterestBadge from './InterestBadge';

export default {
  title: 'badges/InterestBadge',
  component: InterestBadge,
} as ComponentMeta<typeof InterestBadge>;

const Template: ComponentStory<typeof InterestBadge> = () => (
  <Wrapper>
    <InterestBadge interestRate={10} />
    <InterestBadge interestRate={20} />
    <InterestBadge interestRate={30} />
  </Wrapper>
);

const Wrapper = styled.div`
  div + div {
    margin-top: 10px;
  }
`;

export const Variants = Template.bind({});
