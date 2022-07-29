import { HTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as WalkingItemNameButtonBorder } from '@assets/borders/walking-itemName-border.svg';
import renderItemIllust from '@lib/utils/common/renderItemIllust';
import { TItemName } from '@lib/types/kid';
import { theme } from '@lib/styles/theme';

interface WalkingItemNameButtonProps extends HTMLAttributes<HTMLButtonElement> {
  itemName: TItemName;
  isSelected: boolean;
}

function WalkingItemNameButton({
  itemName,
  isSelected = false,
  ...props
}: WalkingItemNameButtonProps) {
  return (
    <Wrapper isSelected={isSelected} {...props}>
      <WalkingItemNameButtonBorder
        fill={
          isSelected
            ? `${theme.palette.main.yellow200}`
            : `${theme.palette.greyScale.white}`
        }
      />
      <Content>{renderItemIllust(itemName)}</Content>
    </Wrapper>
  );
}

export default WalkingItemNameButton;

const Wrapper = styled.button<{ isSelected: boolean }>`
  position: relative;
  cursor: pointer;
  ${({ isSelected }) =>
    isSelected &&
    css`
      transform: scale(1.167);
    `}
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
  padding: 8px;

  svg {
    width: 100%;
    box-sizing: border-box;
  }
`;
