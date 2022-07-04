import { ComponentStory, ComponentMeta } from '@storybook/react';
import Margin from '../common/Margin';
import Summary from './Summary';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: '자녀 홈/Summary',
  component: Summary,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [
    (Story) => (
      <Margin>
        <Story />
      </Margin>
    ),
  ],
} as ComponentMeta<typeof Summary>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Summary> = (args) => (
  <Summary {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  current: 1000,
  goal: 5000,
  month: 6,
  week: 4,
};
