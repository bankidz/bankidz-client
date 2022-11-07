import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractInputForm from './InputForm';

export default {
  title: 'atoms/forms/InputForm',
  component: ContractInputForm,
} as ComponentMeta<typeof ContractInputForm>;

const Template: ComponentStory<typeof ContractInputForm> = (args) => (
  <ContractInputForm {...args} />
);

export const 돈길이름 = Template.bind({});
돈길이름.args = {
  placeholder: '돈길 이름을 입력하세요',
};

export const 생년월일 = Template.bind({});
생년월일.args = {
  placeholder: '2022',
  postfix: '년',
};
