import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarginTemplate from '@components/layout/MarginTemplate';
import TotalInterest from './TotalInterest';

export default {
  title: 'home/walking/TotalInterest',
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
