import { ComponentStory, ComponentMeta } from '@storybook/react';
import WalkingItemNameButton from './WalkingItemNameButton';
import a1 from '@assets/illusts/contractItemNames/contractSelect/a1.svg';

export default {
  title: '돈길 걷기/WalkingItemNameButton',
  component: WalkingItemNameButton,
  decorators: [
    (Story) => (
      <div style={{ width: '90px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof WalkingItemNameButton>;

const Template: ComponentStory<typeof WalkingItemNameButton> = (args) => (
  <WalkingItemNameButton {...args} />
);

export const 예시 = Template.bind({});
예시.args = {
  name: '학용품',
  image: <img src={a1} />,
};
