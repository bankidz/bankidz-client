// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트
// TODO: 이중작업된 컴포넌트

import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import Pending from './Pending';

export default {
  title: '자녀/홈/Pending',
  component: Pending,
  argTypes: { onClick: { action: 'event' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
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
