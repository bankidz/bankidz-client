import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractInputForm from './InputForm';

export default {
  title: 'Common/InputForm',
  component: ContractInputForm,
} as ComponentMeta<typeof ContractInputForm>;

const Template: ComponentStory<typeof ContractInputForm> = (args) => (
  <ContractInputForm {...args} />
);

export const 돈길이름_입력 = Template.bind({});
돈길이름_입력.args = {
  placeholder: '돈길 이름을 입력하세요',
};

export const 생년월일_입력_init = Template.bind({});
생년월일_입력_init.args = {
  placeholder: '2022',
  postfix: '년',
};

export const 생년월일_입력_중 = Template.bind({});
생년월일_입력_중.args = {
  placeholder: '2022',
  postfix: '년',
  value: 202,
};
