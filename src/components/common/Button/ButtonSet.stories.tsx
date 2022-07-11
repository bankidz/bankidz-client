import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonSet from './ButtonSet';
import Button from './Button';

export default {
  title: 'Common/버튼 셋/ButtonSet',
  component: ButtonSet,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ButtonSet>;

const Template: ComponentStory<typeof ButtonSet> = (args) => (
  <ButtonSet {...args} />
);

export const 다음 = Template.bind({});
다음.args = {
  children: <Button property="primary" label="다음" />,
};

export const 포기하기_수락하기 = Template.bind({});
포기하기_수락하기.args = {
  children: [
    <Button property="primary" label="포기하기" state={false} />,
    <Button property="primary" label="수락하기" />,
  ],
};

export const 카카오로_시작하기 = Template.bind({});
카카오로_시작하기.args = {
  children: <Button property="etc" label="카카오로 시작하기" />,
};
