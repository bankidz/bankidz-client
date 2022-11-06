import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectInterestButton from './SelectInterestButton';

export default {
  title: 'home/create/selectInterestButton',
  component: SelectInterestButton,
  decorators: [
    (Story) => (
      <div style={{ width: '86px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SelectInterestButton>;

const Template: ComponentStory<typeof SelectInterestButton> = (args) => (
  <SelectInterestButton {...args} />
);

export const 선택됨 = Template.bind({});
선택됨.args = {
  isSelected: true,
  risk: 10,
};

export const 선택안됨 = Template.bind({});
선택안됨.args = {
  isSelected: false,
  risk: 10,
};
