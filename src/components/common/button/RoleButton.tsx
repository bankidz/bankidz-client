import { HTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as RoleButtonBorder } from '@assets/border/role-button-border.svg';
import { calcRatio, theme } from '@lib/styles/theme';
import { renderRoleIllust, renderRoleText } from '@lib/utils/kid';

interface RoleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isKid: boolean;
  isFemale: boolean;
  /** 버튼이 선택된 경우 isSelect를 true로 설정합니다. 선택되지 않은 경우 false로 설정합니다.*/
  isSelected?: boolean | null;
}

function RoleButton({
  isKid,
  isFemale,
  isSelected,
  ...props
}: RoleButtonProps) {
  const [fillColorByMouseEvent, setFillColorByMouseEvent] = useState('white');
  const [strokeColorByMouseEvent, setStrokeColorByMouseEvent] =
    useState('white');

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
      <div className="content">
        {renderRoleIllust(isKid, isFemale)}
        <span>{renderRoleText(isKid, isFemale)}</span>
      </div>
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

  .content {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

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
        isKid == true &&
        isFemale == true &&
        css`
          margin-left: ${calcRatio(23.02, 146)};
          width: ${calcRatio(101.1, 146)};
        `}
    }

    span {
      width: 100%;
      ${({ theme }) => theme.typo.button.InnerText_T_15_EB}
    }
  }
`;
