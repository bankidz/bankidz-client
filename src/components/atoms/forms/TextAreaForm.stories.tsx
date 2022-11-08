import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextAreaForm from './TextAreaForm';

export default {
  title: 'forms/TextAreaForm',
  component: TextAreaForm,
} as ComponentMeta<typeof TextAreaForm>;

const Template: ComponentStory<typeof TextAreaForm> = (args) => (
  <TextAreaForm {...args} />
);

export const Example = Template.bind({});
Example.args = {
  placeholder: '어떠한 이유든 자유롭게 작성해주세요',
  height: '168px',
  autoFocus: true,
};
