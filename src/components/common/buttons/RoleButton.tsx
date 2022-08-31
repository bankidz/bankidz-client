import { HTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as RoleButtonBorder } from '@assets/borders/role-button-border.svg';
import { calcRatio, theme } from '@lib/styles/theme';
import renderRoleIllust from '@lib/utils/render/renderRoleIllust';
import renderRoleText from '@lib/utils/get/getRoleText';

interface RoleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isKid: boolean;
  isFemale: boolean;
  isSelected?: boolean;
}

/**
 * @param isSelected 버튼이 선택된 경우 true로 설정합니다.
 * 버튼이 선택되지 않은 경우 false로 설정합니다.
 */
function RoleButton({
  isKid,
  isFemale,
  isSelected,
  ...props
}: RoleButtonProps) {
  const [fillColorByMouseEvent, setFillColorByMouseEvent] =
    useState<string>('white');
  const [strokeColorByMouseEvent, setStrokeColorByMouseEvent] =
    useState<string>('#FFF6D2'); // main yellow 100

  function handleMouseOver() {
    setFillColorByMouseEvent(theme.palette.main.yellow100);
    setStrokeColorByMouseEvent(theme.palette.main.yellow300);
  }
  function handleMouseLeave() {
    setFillColorByMouseEvent(theme.palette.greyScale.white);
    setStrokeColorByMouseEvent(theme.palette.main.yellow100);
  }

  return (
    <StyledButton
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      isKid={isKid}
      isFemale={isFemale}
      {...props}
    >
      <RoleButtonBorder
        fill={isSelected ? theme.palette.main.yellow100 : fillColorByMouseEvent}
        stroke={
          isSelected ? theme.palette.main.yellow300 : strokeColorByMouseEvent
        }
      />
      <ContentWrapper isKid={isKid} isFemale={isFemale}>
        {renderRoleIllust(isKid, isFemale)}
        <span>{renderRoleText(isKid, isFemale)}</span>
      </ContentWrapper>
    </StyledButton>
  );
}

export default RoleButton;

const StyledButton = styled.button<{
  isKid: boolean;
  isFemale: boolean;
}>`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  border-radius: 60px; // arbitrary
`;

const ContentWrapper = styled.div<{ isKid: boolean; isFemale: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);

  display: grid;
  grid-template-rows: 115fr 31fr;

  svg {
    margin-bottom: 10px;
    // 아빠
    ${({ isKid, isFemale }) =>
      isKid === false &&
      isFemale === false &&
      css`
        margin-left: ${calcRatio(34, 146)};
        width: ${calcRatio(87.12, 146)};
      `}
    // 엄마
    ${({ isKid, isFemale }) =>
      isKid === false &&
      isFemale === true &&
      css`
        margin-left: ${calcRatio(25, 146)};
        width: ${calcRatio(97.56, 146)};
      `}
    // 아들
    ${({ isKid, isFemale }) =>
      isKid === true &&
      isFemale === false &&
      css`
        margin-left: ${calcRatio(34, 146)};
        width: ${calcRatio(88.81, 146)};
      `}
    // 딸
    ${({ isKid, isFemale }) =>
      isKid === true &&
      isFemale === true &&
      css`
        margin-left: ${calcRatio(23.02, 146)};
        width: ${calcRatio(101.1, 146)};
      `}
  }

  span {
    width: 100%;
    ${({ theme }) => theme.typo.button.InnerText_T_15_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey700};
  }
`;
