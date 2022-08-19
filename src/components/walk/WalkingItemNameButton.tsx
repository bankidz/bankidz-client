import { HTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as WalkingItemNameButtonBorder } from '@assets/borders/walking-itemName-border.svg';
import renderItemIllust from '@lib/utils/render/renderItemIllust';
import { TItemName } from '@lib/types/TItemName';
import { calcRatio, theme } from '@lib/styles/theme';

interface WalkingItemNameButtonProps extends HTMLAttributes<HTMLButtonElement> {
  itemName: TItemName;
  isSelected: boolean;
  isNoticed: boolean;
}

function WalkingItemNameButton({
  itemName,
  isSelected = false,
  isNoticed = false,
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
      {isNoticed && <Dot />}
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
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 8px;
  box-sizing: border-box;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.palette.sementic.red300};
  border-radius: 50%;
  position: absolute;
  top: 0px;
  right: ${calcRatio(3, 48)};
`;
