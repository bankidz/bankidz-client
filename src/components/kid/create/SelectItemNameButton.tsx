import { HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SelectItemNameButtonBorder } from '@assets/borders/itemName-border.svg';
import { calcRatio, theme } from '@lib/styles/theme';

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
    <Wrapper
      onMouseOver={() => setIsSelected(true)}
      onMouseLeave={() => setIsSelected(false)}
      {...props}
    >
      <SelectItemNameButtonBorder
        fill={isSelected ? theme.palette.main.yellow100 : 'white'}
        stroke={
          isSelected
            ? theme.palette.main.yellow300
            : theme.palette.main.yellow100
        }
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
  top: 0px;
  transform: translate3d(-50%, 0, 0);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  svg {
    padding: 0px ${calcRatio(9, 92)};
    padding-top: ${calcRatio(7, 92)};
    width: 100%;
    box-sizing: border-box;
  }
  p {
    ${({ theme }) => theme.typo.button.InnerText_T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    padding-bottom: ${calcRatio(17, 92)};
  }
`;
