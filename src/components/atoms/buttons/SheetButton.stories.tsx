import { ComponentStory, ComponentMeta } from '@storybook/react';
import SheetButton from './SheetButton';

export default {
  title: 'buttons/SheetButton',
  component: SheetButton,
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof SheetButton>;

const Template: ComponentStory<typeof SheetButton> = (args) => (
  <SheetButton {...args} />
);

export const 다음 = Template.bind({});
다음.args = {
  onClickNext: () => {},
  disabledNext: true,
  label: '다음',
  outerSheet: true,
};
