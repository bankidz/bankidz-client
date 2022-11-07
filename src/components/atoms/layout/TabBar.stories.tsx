import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Routes, Route } from 'react-router-dom';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import TabBar from './TabBar';

export default {
  title: 'atoms/layout/TabBar',
  component: TabBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
} as ComponentMeta<typeof TabBar>;

const Template: ComponentStory<typeof TabBar> = () => <TabBar />;

export const Example = Template.bind({});
Example.args = {};
