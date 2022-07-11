import { HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SelectItemNameButtonBorder } from '@assets/border/itemName-border.svg';
import { theme } from '@lib/styles/theme';

interface SelectItemNameButtonProps extends HTMLAttributes<HTMLButtonElement> {
  name: string;
  image: JSX.Element;
}

function SelectItemNameButton({
  name,
  image,
  ...props
}: SelectItemNameButtonProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Wrapper {...props}>
      <SelectItemNameButtonBorder
        onClick={() => setIsSelected(true)}
        fill={isSelected ? theme.palette.yellow[1] : theme.palette.white}
        stroke={isSelected ? theme.palette.yellow[3] : theme.palette.yellow[1]}
      />
      <Content>
        {image}
        <p>{name}</p>
      </Content>
    </Wrapper>
  );
}

export default SelectItemNameButton;

const Wrapper = styled.button`
  position: relative;
  cursor: pointer;
`;
const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  p {
    font-family: 'TmoneyRoundWind';
    font-size: 12px;
    line-height: 100%;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.gray[6]};
  }
`;
