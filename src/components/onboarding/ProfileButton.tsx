import { HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ProfileButtonCharacter } from '@assets/illust/profile-button-character.svg';
import { ReactComponent as ProfileButtonBorder } from '@assets/border/profile-button-border.svg';
import { clacRatio, theme } from '@lib/styles/theme';

interface ProfileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isKid: boolean;
  isFemale: boolean;
  isSelected?: boolean;
}

function ProfileButton({
  isKid,
  isFemale,
  isSelected = false,
  ...props
}: ProfileButtonProps) {
  const [fillColorByMouseEvent, setFillColorByMouseEvent] = useState('white');

  const role = (isKid: boolean, isFemale: boolean) => {
    if (isKid && isFemale) {
      return '딸';
    } else if (isKid && !isFemale) {
      return '아들';
    } else if (!isKid && isFemale) {
      return '엄마';
    } else {
      return '아빠';
    }
  };

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
        <span>{role(isKid, isFemale)}</span>
      </div>
    </StyledButton>
  );
}

export default ProfileButton;

const StyledButton = styled.button`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

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
      ${({ theme }) => theme.typo.button.InnerText_T_15_EB}
    }
  }
`;
