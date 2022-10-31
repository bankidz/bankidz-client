import { ComponentStory, ComponentMeta } from '@storybook/react';
//import './sheetStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import ContractSheet from './ContractSheet';
// import SelectInterest from './sheetContent/SelectInterest';
import SelectMoney from './SelectMoney';
import SelectInterest from './SelectInterest';
import Signature from './Signature';
import RangeInput from './RangeInput';

export default {
  title: 'common/bottomSheets/ContractSheet',
  component: ContractSheet,
  argTypes: {},
} as ComponentMeta<typeof ContractSheet>;

const Template: ComponentStory<typeof ContractSheet> = (args) => (
  <ContractSheet {...args} />
);

export const 목표_금액_입력 = Template.bind({});
목표_금액_입력.args = {
  children: (
    <SelectMoney
      pushAmount={() => {}}
      popAmount={() => {}}
      resetAmount={() => {}}
    />
  ),
  open: true,
  label: '다음',
};

export const 이자율_선택 = Template.bind({});
이자율_선택.args = {
  children: <SelectInterest />,
  open: true,
  label: '다음',
};

export const 매주_저금액_입력 = Template.bind({});
매주_저금액_입력.args = {
  children: (
    <RangeInput totalPrice={100000} min={1500} max={30000} step={500} />
  ),
  open: true,
  label: '다음',
};

export const 사인하기 = Template.bind({});
사인하기.args = {
  children: <Signature setDisabledNext={() => {}} setSign={() => {}} />,
  open: true,
  label: '다음',
};
