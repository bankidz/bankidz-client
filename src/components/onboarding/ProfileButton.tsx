import { HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ProfileButtonCharacter } from '../../assets/icons/profile-button-character.svg';
import { ReactComponent as ProfileButtonBorder } from '../../assets/icons/profile-button-border.svg';
import { theme } from '../../lib/styles/theme';

interface ProfileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** 역할을 선택합니다. "아빠", "엄마", "아들", "딸" 중 하나를 선택합니다. */
  role: '아빠' | '엄마' | '아들' | '딸';
}

export function ProfileButton({ role, ...props }: ProfileButtonProps) {
  const [isSelected, SetIsSelected] = useState(false);
  console.log(isSelected);

  function handleClick() {
    SetIsSelected((prev) => !prev);
  }

  return (
    <StyledButton onClick={handleClick} {...props}>
      <CharacterPositioner>
        <ProfileButtonCharacter />
      </CharacterPositioner>
      <BorderPositioner>
        <ProfileButtonBorder
          fill={isSelected ? theme.palette.yellow[1] : 'white'}
        />
      </BorderPositioner>
      <Label>{role}</Label>
    </StyledButton>
  );
}

export default ProfileButton;

const StyledButton = styled.button`
  position: relative;
  width: 152px;
  height: 160px;

  border: none;
  outline: none;
  border-radius: 28px;

  cursor: pointer;
  background-color: white;

  :disabled {
    background-color: ${({ theme }) => theme.palette.gray[2]};
    color: ${({ theme }) => theme.palette.gray[5]};
  }
`;

const BorderPositioner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 5;
  /* svg {
    background-color: red;
  } */
`;

const CharacterPositioner = styled.div`
  position: absolute;
  left: 50%;
  top: 24px;
  transform: translate3d(-50%, 0, 0);
  z-index: 10;
  /* svg {
    background-color: red;
  } */
`;

const Label = styled.span`
  position: absolute;
  width: 24px;
  height: 12px;
  left: 50%;
  top: 125px;

  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 100%;
  text-align: center;

  transform: translate3d(-50%, -50%, 0);
  z-index: 999;
`;

// https://velog.io/@apro_xo/CSS-top-left-translate%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B0%80%EC%9A%B4%EB%8D%B0-%EC%A0%95%EB%A0%AC
