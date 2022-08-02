import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import OutlinedButton from './OutlinedButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'common/buttons/OutlinedButton',
  component: OutlinedButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { onClick: { action: 'event' } },
} as ComponentMeta<typeof OutlinedButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OutlinedButton> = (args) => (
  <OutlinedButton {...args} />
);

export const 가족_추가하기 = Template.bind({});
가족_추가하기.args = {
  label: '가족 추가하기',
};
