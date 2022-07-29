import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import KidHomeSummary from './KidHomeSummary';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: '자녀/홈/KidHomeSummary',
  component: KidHomeSummary,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [
    (Story) => (
      <MarginTemplate>
        <Story />
      </MarginTemplate>
    ),
  ],
} as ComponentMeta<typeof KidHomeSummary>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof KidHomeSummary> = (args) => (
  <KidHomeSummary {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  current: 1000,
  goal: 5000,
  month: 6,
  week: 4,
};
