import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TabBar from './TabBar';

export default {
  title: 'atoms/layout/TabBar',
  component: TabBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
} as ComponentMeta<typeof TabBar>;

const Template: ComponentStory<typeof TabBar> = (args) => <TabBar />;

export const 자녀 = Template.bind({});
자녀.args = {};
