import { ComponentStory, ComponentMeta } from '@storybook/react';
import TertiaryModal from './TertiaryModal';

export default {
  title: 'common/modals/TertiaryModal',
  component: TertiaryModal,
} as ComponentMeta<typeof TertiaryModal>;

const Template: ComponentStory<typeof TertiaryModal> = () => <TertiaryModal />;

export const 이자란 = Template.bind({});
