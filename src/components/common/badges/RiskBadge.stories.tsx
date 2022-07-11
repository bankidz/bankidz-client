import { ComponentStory, ComponentMeta } from '@storybook/react';
import RiskBadge from './RiskBadge';

export default {
  title: 'Common/뱃지/RiskBadge',
  component: RiskBadge,
} as ComponentMeta<typeof RiskBadge>;

const Template: ComponentStory<typeof RiskBadge> = (args) => (
  <RiskBadge {...args} />
);

export const 위험도_안정 = Template.bind({});
위험도_안정.args = {
  riskLevel: '안정',
};

export const 위험도_중립 = Template.bind({});
위험도_중립.args = {
  riskLevel: '중립',
};

export const 위험도_위험 = Template.bind({});
위험도_위험.args = {
  riskLevel: '위험',
};
