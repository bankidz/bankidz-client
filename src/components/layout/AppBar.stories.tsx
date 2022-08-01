import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppBar from './AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default {
  title: 'layout/AppBar',
  component: AppBar,
  argTypes: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </BrowserRouter>
    ),
  ],
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
