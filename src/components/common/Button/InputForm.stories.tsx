import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractInputForm from './InputForm';

export default {
  title: 'Common/버튼/InputForm',
  component: ContractInputForm,
} as ComponentMeta<typeof ContractInputForm>;

const Template: ComponentStory<typeof ContractInputForm> = (args) => (
  <ContractInputForm {...args} />
);

export const 돈길이름_입력 = Template.bind({});
돈길이름_입력.args = {
  placeholder: '돈길 이름을 입력하세요',
};
