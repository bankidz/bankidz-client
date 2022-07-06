import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommonSheet from './CommonSheet';

export default {
  title: 'bottomSheet/CommonSheet',
  component: CommonSheet,
  argTypes: {},
} as ComponentMeta<typeof CommonSheet>;

const Template: ComponentStory<typeof CommonSheet> = (args) => (
  <CommonSheet {...args} />
);

export const 모달_바텀시트 = Template.bind({});
모달_바텀시트.args = {
  children: <div style={{ height: '200px' }}>바텀시트</div>,
  overlay: true,
};

export const 돈길계약_바텀시트 = Template.bind({});
돈길계약_바텀시트.args = {
  children: <div style={{ height: '200px' }}>바텀시트</div>,
  overlay: false,
};
