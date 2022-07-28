import { ComponentStory, ComponentMeta } from '@storybook/react';
import 'react-spring-bottom-sheet/dist/style.css';
import CommonSheet from './CommonSheet';
import GiveUpMoneyRoadSheetContent from './sheetContents/GiveUpMoneyRoadSheetContent';
import SelectProfile from './sheetContents/SelectProfile';

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
  children: (
    <GiveUpMoneyRoadSheetContent
      onGiveUpButtonClick={() => {}}
      onDismiss={() => {}}
    />
  ),
  open: true,
};
