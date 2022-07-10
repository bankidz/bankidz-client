import { ComponentStory, ComponentMeta } from '@storybook/react';
import Margin from '../../layout/Margin';
import Pending from './Pending';

export default {
  title: '자녀/홈/Pending',
  component: Pending,
  argTypes: { onClick: { action: 'event' } },
  decorators: [
    (Story) => (
      <Margin>
        <Story />
      </Margin>
    ),
  ],
} as ComponentMeta<typeof Pending>;

const Template: ComponentStory<typeof Pending> = (args) => (
  <Pending {...args} />
);

export const 제안중 = Template.bind({});
제안중.args = {
  date: '2022-07-06 00:00:00',
  name: '책가방 사기',
  isSuggesting: true,
};

export const 거절됨 = Template.bind({});
거절됨.args = {
  date: '2022-07-06 00:00:00',
  name: '책가방 사기',
  isSuggesting: false,
};
