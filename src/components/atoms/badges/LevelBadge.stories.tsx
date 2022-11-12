import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import LevelBadge from './LevelBadge';

export default {
  title: 'badges/LevelBadge',
  component: LevelBadge,
} as ComponentMeta<typeof LevelBadge>;

const Template: ComponentStory<typeof LevelBadge> = () => (
  <Wrapper>
    <LevelBadge level={1} />
    <LevelBadge level={2} />
    <LevelBadge level={3} />
    <LevelBadge level={4} />
    <LevelBadge level={-4} />
    <LevelBadge level={5} />
  </Wrapper>
);

const Wrapper = styled.div`
  div + div {
    margin-top: 10px;
  }
`;

export const Variants = Template.bind({});
