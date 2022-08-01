import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import Button from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'common/buttons/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { onClick: { action: 'event' } },
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const 다음 = Template.bind({});
다음.args = {
  label: '다음',
};

export const 다음_disabled = Template.bind({});
다음_disabled.args = {
  label: '다음',
  state: false,
};

export const 카카오로_시작하기 = Template.bind({});
카카오로_시작하기.args = {
  label: '카카오로 시작하기',
  property: 'kakao',
};

export const 삭제하기_바텀시트 = Template.bind({});
삭제하기_바텀시트.args = {
  label: '삭제하기',
  property: 'delete',
};

export const 삭제하기_모달 = Template.bind({});
삭제하기_모달.args = {
  label: '삭제하기',
  fixed: true,
};
