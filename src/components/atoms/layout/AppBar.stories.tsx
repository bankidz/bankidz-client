import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Routes, Route } from 'react-router-dom';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import AppBar from './AppBar';

export default {
  title: 'layout/AppBar',
  component: AppBar,
  argTypes: {},
  decorators: [
    (Story) => (
      <Routes>
        <Route path="*" element={<Story />} />
      </Routes>
    ),
  ],
  parameters: {
    backgrounds: {
      values: [{ name: 'black', value: '#FAFAFC' }],
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

export const 돈길_계약하기 = Template.bind({});
돈길_계약하기.args = {
  label: '돈길 계약하기',
};

export const 걷고있는_돈길 = Template.bind({});
걷고있는_돈길.args = {
  label: '내정보 수정',
  level: 2,
};
