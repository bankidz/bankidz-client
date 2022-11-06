import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import WalkingItemNameButton from './WalkingItemNameButton';

export default {
  title: 'walk/WalkingItemNameButton',
  component: WalkingItemNameButton,
  decorators: [
    (Story) => (
      <DongilList>
        <div>
          <Story />
        </div>
        <div>
          <Story />
        </div>
        <div>
          <Story />
        </div>
      </DongilList>
    ),
  ],
} as ComponentMeta<typeof WalkingItemNameButton>;

const Template: ComponentStory<typeof WalkingItemNameButton> = (args) => (
  <WalkingItemNameButton {...args} />
);

export const _default = Template.bind({});
_default.args = {
  itemName: '학용품',
};

export const selected = Template.bind({});
selected.args = {
  itemName: '학용품',
  isSelected: true,
};

export const noticed_default = Template.bind({});
noticed_default.args = {
  itemName: '학용품',
  isSelected: false,
  isNoticed: true,
};

export const noticed_selected = Template.bind({});
noticed_selected.args = {
  itemName: '학용품',
  isSelected: true,
  isNoticed: true,
};

const DongilList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;

  height: 56px;
  //gap: 12px;

  & > div {
    position: relative;
    &:not(:last-child) {
      margin-right: 12px;
    }
    & > svg {
      position: absolute;
      bottom: -40.5px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
  }
`;
