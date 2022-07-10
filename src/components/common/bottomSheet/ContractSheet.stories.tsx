import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractSheet from './ContractSheet';
//import './sheetStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import SelectInterest from './sheetContent/SelectInterest';
import SelectMoney from './sheetContent/SelectMoney';

export default {
  title: 'Common/BottomSheet/ContractSheet',
  component: ContractSheet,
  argTypes: {},
} as ComponentMeta<typeof ContractSheet>;

const Template: ComponentStory<typeof ContractSheet> = (args) => (
  <ContractSheet {...args} />
);

export const 모을_금액_입력 = Template.bind({});
모을_금액_입력.args = {
  children: <SelectMoney />,
  open: true,
  label: '다음',
};

export const 이자율_선택 = Template.bind({});
이자율_선택.args = {
  children: <SelectInterest />,
  open: true,
  label: '다음',
};
