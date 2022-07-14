import styled, { css } from 'styled-components';
import { ReactComponent as Check } from '@assets/icon/check.svg';
import { HTMLAttributes } from 'react';
import { darken } from 'polished';

interface CheckButtonProps extends HTMLAttributes<HTMLButtonElement> {}

function CheckButton({ onClick }: CheckButtonProps) {
  return (
    <StyledButton onClick={onClick}>
      <Check />
    </StyledButton>
  );
}

export default CheckButton;

const StyledButton = styled.button`
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.palette.main.yellow300};
  border-radius: ${({ theme }) => theme.radius.medium};

  ${({ theme }) => {
    const selected = theme.palette.main.yellow300;
    return css`
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}
`;
