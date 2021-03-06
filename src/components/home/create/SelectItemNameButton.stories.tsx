import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectItemNameButton from './SelectItemNameButton';

export default {
  title: '자녀/돈길 계약하기/selectItemNameButton',
  component: SelectItemNameButton,
  decorators: [
    (Story) => (
      <div style={{ width: '90px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SelectItemNameButton>;

const Template: ComponentStory<typeof SelectItemNameButton> = (args) => (
  <SelectItemNameButton {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  itemName: '학용품',
};
