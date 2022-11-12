import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import RoleButton from './RoleButton';

export default {
  title: 'buttons/RoleButton',
  component: RoleButton,
  argTypes: {
    onClick: { action: 'handle click' },
  },
} as ComponentMeta<typeof RoleButton>;

const VariantsTemplate: ComponentStory<typeof RoleButton> = () => (
  <Wrapper>
    <div className="first-line">
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
    </div>

    <div className="second-line">
      <div className="element">
        <RoleButton isKid={true} isFemale={true} isSelected />
      </div>
      <div className="element">
        <RoleButton isKid={true} isFemale={false} isSelected />
      </div>
      <div className="element">
        <RoleButton isKid={false} isFemale={true} isSelected />
      </div>
      <div className="element">
        <RoleButton isKid={false} isFemale={false} isSelected />
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .first-line,
  .second-line {
    display: flex;
    .element {
      width: 150px;
      margin: 10px;
    }
  }
`;

const ExampleTemplate: ComponentStory<typeof RoleButton> = (args) => (
  <ExampleWrapper>
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
  </ExampleWrapper>
);

const ExampleWrapper = styled.div`
  display: flex;
  .element {
    width: 150px;
    margin: 10px;
  }
`;

export const Variants = VariantsTemplate.bind({});

export const Example = ExampleTemplate.bind({});
Example.args = {
  isKid: true,
  isFemale: true,
};
