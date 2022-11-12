import { ComponentStory, ComponentMeta } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import SecondaryModal from './SecondaryModal';

export default {
  title: 'modals/SecondaryModal',
  component: SecondaryModal,
  decorators: [(Story) => <Story />],
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
  parameters: {
    backgrounds: {
      values: [{ name: 'black', value: '#FAFAFC' }],
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
} as ComponentMeta<typeof SecondaryModal>;

const Template: ComponentStory<typeof SecondaryModal> = (args) => (
  <SecondaryModal {...args} />
);

export const Example = Template.bind({});
Example.args = {
  badgeText: '돈길완주 성공',
  headerText: '에어팟 사기',
  bodyText: '10주 간의 여정이 끝났어요.\n이제 돈을 찾아 구매하러 가보세요.',
};
