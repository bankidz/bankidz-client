import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppBar from './AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default {
  title: '레이아웃/AppBar',
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

export const 내_정보_수정 = Template.bind({});
내_정보_수정.args = {
  label: '내정보 수정',
};
