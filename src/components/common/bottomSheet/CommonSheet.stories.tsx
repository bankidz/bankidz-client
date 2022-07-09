import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommonSheet from './CommonSheet';
//import './sheetStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import SelectProfile from './sheetContent/SelectProfile';
import DeleteChallenge from './sheetContent/DeleteChallenge';

export default {
  title: 'Common/CommonSheet',
  component: CommonSheet,
  argTypes: {},
} as ComponentMeta<typeof CommonSheet>;

const Template: ComponentStory<typeof CommonSheet> = (args) => (
  <CommonSheet {...args} />
);

export const 프로필_선택_확인 = Template.bind({});
프로필_선택_확인.args = {
  children: <SelectProfile role={'아빠'} onClick={() => {}} />,
  open: true,
};

export const 돈길포기_확인 = Template.bind({});
돈길포기_확인.args = {
  children: <DeleteChallenge onClickDelete={() => {}} onDismiss={() => {}} />,
  open: true,
};
