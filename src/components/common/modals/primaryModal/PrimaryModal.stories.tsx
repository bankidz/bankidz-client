import { ComponentStory, ComponentMeta } from '@storybook/react';
import PrimaryModal from './PrimaryModal';

export default {
  title: 'common/modals/PrimaryModal',
  component: PrimaryModal,
  decorators: [(Story) => <Story />],
  argTypes: {
    onSubmit: { action: 'handle click' },
  },
} as ComponentMeta<typeof PrimaryModal>;

const Template: ComponentStory<typeof PrimaryModal> = (args) => (
  <PrimaryModal {...args} />
);

export const 에어팟_사기 = Template.bind({});
에어팟_사기.args = {
  isKid: false,
  isFemale: false,
  headerText: '뱅키즈 첫 가입을 축하해요',
  bodyText: '뱅키와 저금을 통해 돈길만 걸어요',
};
