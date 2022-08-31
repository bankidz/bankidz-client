import { ComponentStory, ComponentMeta } from '@storybook/react';
import 'react-spring-bottom-sheet/dist/style.css';
import CommonSheet from './CommonSheet';
import Check from './Check';
import SelectProfile from './SelectProfile';
import GiveUpCheck from './GiveUpCheck';
import Completed from './Completed';
import Notice from './Notice';
import DongilFailed from './DongilFailed';

export default {
  title: 'common/bottomSheets/CommonSheet',
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

export const 돈길_수락 = Template.bind({});
돈길_수락.args = {
  children: (
    <Check type={'approve'} onMainActionClick={() => {}} onDismiss={() => {}} />
  ),
  open: true,
};
export const 가족그룹_이동 = Template.bind({});
가족그룹_이동.args = {
  children: (
    <Check
      type={'moveGroup'}
      onMainActionClick={() => {}}
      onDismiss={() => {}}
    />
  ),
  open: true,
};

export const 삭제_완료 = Template.bind({});
삭제_완료.args = {
  children: <Completed type="delete" onMainActionClick={() => {}} />,
  open: true,
};

export const 수락_완료 = Template.bind({});
수락_완료.args = {
  children: <Completed type="approve" onMainActionClick={() => {}} />,
  open: true,
};

export const 포기_취소 = Template.bind({});
포기_취소.args = {
  children: <Completed type="cancel" onMainActionClick={() => {}} />,
  open: true,
};

export const 피드백_전송 = Template.bind({});
피드백_전송.args = {
  children: <Completed type="feedback" onMainActionClick={() => {}} />,
  open: true,
};

export const 돈길_포기_완료 = Template.bind({});
돈길_포기_완료.args = {
  children: (
    <Completed
      type="giveUp"
      title="에어팟 구매하기"
      onMainActionClick={() => {}}
    />
  ),
  open: true,
};

export const 포기_횟수_초과 = Template.bind({});
포기_횟수_초과.args = {
  children: <Notice type="giveUpExceeded" />,
  open: true,
};

export const 뱅키즈_쉬는날 = Template.bind({});
뱅키즈_쉬는날.args = {
  children: <Notice type="sunday" />,
  open: true,
};

export const 돈길_실패 = Template.bind({});
돈길_실패.args = {
  children: (
    <DongilFailed
      onDeleteButtonClick={() => {}}
      onCancelButtonClick={() => {}}
      title={'핸드폰 케이스 사기'}
      interestRate={20}
    />
  ),
  open: true,
};
