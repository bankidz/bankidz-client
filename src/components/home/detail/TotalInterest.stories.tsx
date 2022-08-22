import { ComponentStory, ComponentMeta } from '@storybook/react';
import TotalInterest from './TotalInterest';

export default {
  title: 'home/detail/TotalInterest',
  component: TotalInterest,
  decorators: [
    (Story) => (
      <div style={{ padding: '18px', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TotalInterest>;

const Template: ComponentStory<typeof TotalInterest> = (args) => (
  <TotalInterest {...args} />
);

export const 예시 = Template.bind({});
