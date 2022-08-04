import { HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SelectItemNameButtonBorder } from '@assets/borders/itemName-border.svg';
import { calcRatio, theme } from '@lib/styles/theme';
import { TItemName } from '@lib/types/kid';
import renderItemIllustForCreate from '@lib/utils/kid/renderItemIllustForCreate';

interface SelectItemNameButtonProps extends HTMLAttributes<HTMLButtonElement> {
  itemName: TItemName;
}

function SelectItemNameButton({
  itemName,
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
        {renderItemIllustForCreate(itemName)}
        <p>{itemName}</p>
      </Content>
    </Wrapper>
  );
}

export default SelectItemNameButton;

const Wrapper = styled.button`
  position: relative;
  cursor: pointer;
  border-radius: 40%;
`;
const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translate3d(-50%, 0, 0);
  width: 100%;

  display: grid;
  grid-template-rows: 63fr 29fr;

  svg {
    width: 100%;
    padding: ${calcRatio(7, 92)} ${calcRatio(9, 92)} ${calcRatio(2, 92)}
      ${calcRatio(9, 92)};
    box-sizing: border-box;
  }
  p {
    ${({ theme }) => theme.typo.button.InnerText_T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey700};
  }
`;
