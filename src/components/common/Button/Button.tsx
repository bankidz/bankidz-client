import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import kakao from '@assets/icon/kakao.svg';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * ButtonSet에서 받아온 prop
   * etc : 카카오로그인 / primary-secondary : 한칸 두칸
   */
  property?: 'etc' | 'primary' | 'secondary';
  /**
   * 버튼 내용
   */
  label: string;
  /**
   * 버튼 활성화 상태
   */
  state?: boolean;
  /**
   * 강조되지 않은 버튼
   */
  sub?: boolean;
}

function Button({
  property = 'primary',
  label,
  state = true,
  sub = false,
  ...props
}: ButtonProps) {
  return (
    <Wrapper
      property={property}
      state={state}
      disabled={!state}
      sub={sub}
      {...props}
    >
      {property == 'etc' && <img src={kakao} />}
      <p>{label}</p>
    </Wrapper>
  );
}

export default Button;

const Wrapper = styled.button<{
  property: 'etc' | 'primary' | 'secondary';
  state: boolean;
  sub: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ property }) => (property == 'secondary' ? '160px' : '100%')};
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: none;
  cursor: pointer;
  p {
    ${({ theme }) => theme.typo.button.Primary_T_15_EB}
  }

  ${({ property }) =>
    property == 'etc' &&
    css`
      color: #191919 !important;
      background-color: #fee500; // Kakao yellow

      img {
        display: flex;
        padding-right: 280px;
      }
      p {
        position: absolute;
      }
    `};
  ${({ sub }) =>
    sub
      ? css`
          color: ${({ theme }) => theme.palette.greyScale.white};
          background-color: ${({ theme }) => theme.palette.greyScale.grey300};
        `
      : css`
          color: ${({ theme }) => theme.palette.greyScale.white};
          background-color: ${({ theme }) => theme.palette.main.yellow300};
        `}

  :disabled {
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
    color: ${({ theme }) => theme.palette.greyScale.white};
  }
`;
