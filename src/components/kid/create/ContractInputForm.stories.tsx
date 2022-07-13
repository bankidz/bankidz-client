import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractInputForm from './ContractInputForm';

export default {
  title: '자녀/돈길 계약하기/ContractInputForm',
  component: ContractInputForm,
} as ComponentMeta<typeof ContractInputForm>;

const Template: ComponentStory<typeof ContractInputForm> = (args) => (
  <ContractInputForm {...args} />
);

export const Step_1 = Template.bind({});
Step_1.args = {};
