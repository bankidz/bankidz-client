import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmptyPendingDongil from './EmptyPendingDongil';
import MarginTemplate from '@components/layout/MarginTemplate';

export default {
  title: '자녀/홈/EmptyPendingDongil',
  component: EmptyPendingDongil,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof EmptyPendingDongil>;

const Template: ComponentStory<typeof EmptyPendingDongil> = (args) => (
  <EmptyPendingDongil />
);

export const 예시 = Template.bind({});
