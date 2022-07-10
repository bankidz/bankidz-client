import { ComponentStory, ComponentMeta } from '@storybook/react';
import SecondaryModal from './SecondaryModal';

export default {
  title: '모달/SecondaryModal',
  component: SecondaryModal,
  argTypes: {
    onSubmit: { action: 'handle Submit' },
  },
} as ComponentMeta<typeof SecondaryModal>;

const Template: ComponentStory<typeof SecondaryModal> = (args) => (
  <SecondaryModal {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  badgeContent: '돈길완주 성공',
  headerContent: '에어팟 사기',
  bodyContent: '10주 간의 여정이 끝났어요.\n이제 돈을 찾아 구매하러 가보세요.',
};
