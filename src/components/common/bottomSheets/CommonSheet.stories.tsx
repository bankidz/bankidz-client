import { ComponentStory, ComponentMeta } from '@storybook/react';
import 'react-spring-bottom-sheet/dist/style.css';
import CommonSheet from './CommonSheet';
import DeleteCheck from './sheetContents/DeleteCheck';
import GiveUpExceeded from './sheetContents/GiveUpExceeded';
import GiveUpCheck from './sheetContents/GiveUpCheck';
import SelectProfile from './sheetContents/SelectProfile';
import SheetCompleted from './sheetContents/SheetCompleted';

export default {
  title: 'Common/바텀 시트/CommonSheet',
  component: CommonSheet,
  argTypes: {},
} as ComponentMeta<typeof CommonSheet>;

const Template: ComponentStory<typeof CommonSheet> = (args) => (
  <CommonSheet {...args} />
);

export const 프로필_선택_확인 = Template.bind({});
프로필_선택_확인.args = {
  children: <SelectProfile isKid={false} isFemale={false} />,
  open: true,
};

export const 돈길포기_확인 = Template.bind({});
돈길포기_확인.args = {
  children: <GiveUpCheck onGiveUpButtonClick={() => {}} onDismiss={() => {}} />,
  open: true,
};

export const 삭제_확인 = Template.bind({});
삭제_확인.args = {
  children: <DeleteCheck onClickDelete={() => {}} onDismiss={() => {}} />,
  open: true,
};

export const 삭제_완료 = Template.bind({});
삭제_완료.args = {
  children: <SheetCompleted type="delete" onDismiss={() => {}} />,
  open: true,
};

export const 포기_취소 = Template.bind({});
포기_취소.args = {
  children: <SheetCompleted type="cancel" onDismiss={() => {}} />,
  open: true,
};

export const 돈길_포기_완료 = Template.bind({});
돈길_포기_완료.args = {
  children: (
    <SheetCompleted
      type="giveUp"
      title="에어팟 구매하기"
      onDismiss={() => {}}
    />
  ),
  open: true,
};

export const 포기_횟수_초과 = Template.bind({});
포기_횟수_초과.args = {
  children: <GiveUpExceeded onDismiss={() => {}} />,
  open: true,
};
