import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractSheet from './ContractSheet';
//import './sheetStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import InsertMoney from './sheetContent/InsertMoney';

export default {
  title: 'Common/ContractSheet',
  component: ContractSheet,
  argTypes: {},
} as ComponentMeta<typeof ContractSheet>;

const Template: ComponentStory<typeof ContractSheet> = (args) => (
  <ContractSheet {...args} />
);

export const 모을_금액_입력 = Template.bind({});
모을_금액_입력.args = {
  children: <InsertMoney />,
  open: true,
};
