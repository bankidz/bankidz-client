import { ComponentStory, ComponentMeta } from '@storybook/react';
import RiskBadge from './RiskBadge';

export default {
  title: 'badges/RiskBadge',
  component: RiskBadge,
} as ComponentMeta<typeof RiskBadge>;

const Template: ComponentStory<typeof RiskBadge> = (args) => (
  <RiskBadge {...args} />
);

export const 안정 = Template.bind({});
안정.args = {
  riskLevel: '안정',
};

export const 중립 = Template.bind({});
중립.args = {
  riskLevel: '중립',
};

export const 위험 = Template.bind({});
위험.args = {
  riskLevel: '위험',
};
