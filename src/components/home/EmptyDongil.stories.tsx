import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmptyDongil from './EmptyDongil';
import MarginTemplate from '@components/layout/MarginTemplate';

export default {
  title: 'home/EmptyDongil',
  component: EmptyDongil,
  argTypes: { onClick: { action: 'handle click' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof EmptyDongil>;

const Template: ComponentStory<typeof EmptyDongil> = (args) => (
  <EmptyDongil {...args} />
);

export const 대기중인_돈길이_없어요 = Template.bind({});
대기중인_돈길이_없어요.args = {
  property: 'pending',
};

export const 제안받은_돈길이_없어요 = Template.bind({});
제안받은_돈길이_없어요.args = {
  property: 'proposed',
};

export const 걷고있는_돈길이_없어요 = Template.bind({});
걷고있는_돈길이_없어요.args = {
  property: 'thisWeekS',
};
