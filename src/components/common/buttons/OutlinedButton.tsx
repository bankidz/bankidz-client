import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import kakao from '@assets/icons/kakao.svg';
import { theme } from '@lib/styles/theme';

interface OutlinedButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  state?: boolean;
}

/**
 * @param label 버튼 내용
 * @param state 버튼 활성화 상태
 */
function OutlinedButton({
  label,
  state = true,
  ...props
}: OutlinedButtonProps) {
  return (
    <Wrapper state={state} disabled={!state} {...props}>
      <p>{label}</p>
    </Wrapper>
  );
}

export default OutlinedButton;

const Wrapper = styled.button<{
  state: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 154px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 2px solid
    ${({ theme, state }) =>
      state ? theme.palette.main.yellow300 : theme.palette.greyScale.grey300};

  cursor: pointer;
  p {
    ${({ theme }) => theme.typo.button.Secondary_T_13_EB};
    color: ${({ theme, state }) =>
      state ? theme.palette.main.yellow400 : theme.palette.greyScale.grey400};
  }

  background-color: transparent;

  ${({ theme, state }) => {
    const selected = theme.palette.main.yellow300;
    return (
      state &&
      css`
        &:active {
          border-color: ${darken(0.1, selected)};
        }
      `
    );
  }}
`;
