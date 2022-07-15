import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';
import ButtonSet from './ButtonSet';

export default {
  title: 'Common/버튼 셋/ButtonSet',
  component: ButtonSet,
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
  children: <Button property="kakao" label="카카오로 시작하기" />,
};
