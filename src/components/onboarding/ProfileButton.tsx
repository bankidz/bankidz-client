import { HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ProfileButtonCharacter } from '../../assets/icons/profile-button-character.svg';
import { ReactComponent as ProfileButtonBorder } from '../../assets/icons/profile-button-border.svg';
import { calcRem, clacRatio, theme } from '../../lib/styles/theme';

interface ProfileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** 역할을 선택합니다. '아빠', '엄마', '아들', '딸' 중 하나를 선택합니다. */
  role: '아빠' | '엄마' | '아들' | '딸';
  isSelected?: boolean;
}

export function ProfileButton({
  role,
  isSelected = false,
  ...props
}: ProfileButtonProps) {
  const [fillColorByMouseEvent, setFillColorByMouseEvent] = useState('white');

  function handleMouseDown() {
    setFillColorByMouseEvent(theme.palette.yellow[1]);
  }
  function handleMouseUp() {
    setFillColorByMouseEvent('white');
  }

  return (
    <StyledButton
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      <ProfileButtonBorder
        fill={isSelected ? theme.palette.yellow[1] : fillColorByMouseEvent}
      />
      <div className="content">
        <ProfileButtonCharacter />
        <span>{role}</span>
      </div>
    </StyledButton>
  );
}

export default ProfileButton;

const StyledButton = styled.button`
  position: relative;
  width: 100%;

  border: none;
  outline: none;
  border-radius: 28px;

  .content {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg {
      width: ${clacRatio(62.64, 152)};
      margin-bottom: 25.23px;
    }

    span {
      width: 24px;
      height: 12px;

      font-style: normal;
      font-weight: 800;
      font-size: 12px;
      line-height: 100%;
    }
  }
`;
