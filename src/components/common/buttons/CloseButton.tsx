import styled, { css } from 'styled-components';
import { HTMLAttributes } from 'react';
import { darken } from 'polished';
import { ReactComponent as Close } from '@assets/icons/close.svg';

type CheckButtonProps = HTMLAttributes<HTMLButtonElement>;

function CloseButton({ onClick }: CheckButtonProps) {
  return (
    <StyledButton onClick={onClick}>
      <Close />
    </StyledButton>
  );
}

export default CloseButton;

const StyledButton = styled.button`
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.palette.greyScale.grey200};
  border-radius: ${({ theme }) => theme.radius.medium};

  ${({ theme }) => {
    const selected = theme.palette.greyScale.grey200;
    return css`
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}
`;
