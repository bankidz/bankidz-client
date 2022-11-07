import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import RoleButton from './RoleButton';

export default {
  title: 'atoms/buttons/RoleButton',
  component: RoleButton,
  argTypes: {
    onClick: { action: 'handle click' },
  },
} as ComponentMeta<typeof RoleButton>;

const Template: ComponentStory<typeof RoleButton> = () => (
  <Wrapper>
    <div className="element">
      <RoleButton isKid={true} isFemale={true} />
    </div>
    <div className="element">
      <RoleButton isKid={true} isFemale={false} />
    </div>
    <div className="element">
      <RoleButton isKid={false} isFemale={true} />
    </div>
    <div className="element">
      <RoleButton isKid={false} isFemale={false} />
    </div>
  </Wrapper>
);

const Template2: ComponentStory<typeof RoleButton> = (args) => (
  <Wrapper>
    <div className="element">
      <RoleButton {...args} />
    </div>
    <div className="element">
      <RoleButton {...args} />
    </div>
    <div className="element">
      <RoleButton {...args} />
    </div>
    <div className="element">
      <RoleButton {...args} />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  .element {
    width: 150px;
    margin-right: 10px;
  }
`;

export const Variants = Template.bind({});

export const Example = Template2.bind({});
Example.args = {
  isKid: true,
  isFemale: true,
};
