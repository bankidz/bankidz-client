import { ComponentStory, ComponentMeta } from '@storybook/react';
import TabBar from './TabBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

export default {
  title: 'Common/TabBar',
  component: TabBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div
                style={{
                  backgroundColor: '#F7F7F8',
                  width: '100%',
                  height: 'calc(var(--vh, 1vh) * 100)',
                }}
              >
                <Story />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    ),
  ],
} as ComponentMeta<typeof TabBar>;

const Template: ComponentStory<typeof TabBar> = (args) => <TabBar {...args} />;

export const 자녀 = Template.bind({});
자녀.args = {
  isKid: true,
};
