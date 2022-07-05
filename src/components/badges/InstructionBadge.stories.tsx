import { ComponentStory, ComponentMeta } from '@storybook/react';
import InstructionBadge from './InstructionBadge';

export default {
  title: 'badges/InstructionBadge',
  component: InstructionBadge,
} as ComponentMeta<typeof InstructionBadge>;

const Template: ComponentStory<typeof InstructionBadge> = (args) => (
  <InstructionBadge {...args} />
);

export const tenWeeks = Template.bind({});
tenWeeks.args = {
  property: 'primary',
  children: '10주',
};

export const fiveThousandWon = Template.bind({});
fiveThousandWon.args = {
  property: 'secondary',
  children: '5,000원',
};

export const fiveHundredWon = Template.bind({});
fiveHundredWon.args = {
  property: 'tertiary',
  children: '500원',
};
