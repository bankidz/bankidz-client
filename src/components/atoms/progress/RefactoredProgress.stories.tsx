import { ComponentStory, ComponentMeta } from '@storybook/react';
import RefactoredProgress from './RefactoredProgress';

export default {
  title: 'etc/RefactoredProgress',
  component: RefactoredProgress,
} as ComponentMeta<typeof RefactoredProgress>;

const Template: ComponentStory<typeof RefactoredProgress> = (args) => (
  <RefactoredProgress {...args} />
);

export const example = Template.bind({});
example.args = {
  now: 3,
  total: 5,
};
