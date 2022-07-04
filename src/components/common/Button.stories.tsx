import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';
import Margin from './Margin';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { onClick: { action: 'event' } },
  decorators: [
    (Story) => (
      <Margin>
        <Story />
      </Margin>
    ),
  ],
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const 다음 = Template.bind({});
다음.args = {
  property: 'primary',
  label: '다음',
};

export const 다음_disabled = Template.bind({});
다음_disabled.args = {
  property: 'primary',
  label: '다음',
  state: false,
};

export const 카카오로_시작하기 = Template.bind({});
카카오로_시작하기.args = {
  label: '카카오로 시작하기',
  property: 'etc',
};

export const 가족_추가하기 = Template.bind({});
가족_추가하기.args = {
  label: '가족 추가하기',
  property: 'secondary',
};
