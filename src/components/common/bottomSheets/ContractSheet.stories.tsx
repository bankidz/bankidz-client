import { ComponentStory, ComponentMeta } from '@storybook/react';
//import './sheetStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import ContractSheet from './ContractSheet';
// import SelectInterest from './sheetContent/SelectInterest';
import SelectMoney from './sheetContents/SelectMoney';
import SelectInterestButton from '@components/home/create/SelectInterestButton';

export default {
  title: 'Common/바텀 시트/ContractSheet',
  component: ContractSheet,
  argTypes: {},
} as ComponentMeta<typeof ContractSheet>;

const Template: ComponentStory<typeof ContractSheet> = (args) => (
  <ContractSheet {...args} />
);

export const 모을_금액_입력 = Template.bind({});
모을_금액_입력.args = {
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
  // children: <SelectInterestButton />,
  open: true,
  label: '다음',
};
