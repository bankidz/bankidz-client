import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import kakao from '@assets/icon/kakao.svg';
import { darken } from 'polished';
import { theme } from '@lib/styles/theme';
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * 기본, 카카오로그인, 삭제, 강조되지 않은 버튼
   */
  property?: 'default' | 'kakao' | 'delete' | 'sub';
  /**
   * 버튼 내용
   */
  label: string;
  /**
   * 버튼 활성화 상태
   */
  state?: boolean;
  /**
   * 너비 고정, 가운데 정렬인 버튼 (모달->삭제하기)
   */
  fixed?: boolean;
}

function Button({
  property = 'default',
  label,
  state = true,
  ...props
}: ButtonProps) {
  return (
    <Wrapper
      property={property}
      state={state}
      fixed={false}
      disabled={!state}
      {...props}
    >
      {property == 'kakao' && <img src={kakao} />}
      <p>{label}</p>
    </Wrapper>
  );
}

export default Button;

const handleColorType = (property: 'default' | 'kakao' | 'delete' | 'sub') => {
  const defaultColor = theme.palette.main.yellow300;
  const subColor = theme.palette.greyScale.grey300;
  const deleteColor = theme.palette.sementic.red300;
  const kakaoColor = '#fee500';

  switch (property) {
    case 'default':
      return defaultColor;
    case 'sub':
      return subColor;
    case 'delete':
      return deleteColor;
    case 'kakao':
      return kakaoColor;
    default:
      return subColor;
  }
};

const Wrapper = styled.button<{
  property: 'default' | 'kakao' | 'delete' | 'sub';
  fixed: boolean;
  state: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ fixed }) => (fixed ? '154px' : '100%')};
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: none;

  cursor: pointer;
  p {
    ${({ theme }) => theme.typo.button.Primary_T_15_EB}
  }
  color: ${({ theme }) => theme.palette.greyScale.white};

  background-color: ${({ property }) => handleColorType(property)};

  ${({ property }) => {
    const selected = handleColorType(property) as string;
    return css`
      &:active {
        background-color: ${darken(0.1, selected)};
      }
    `;
  }}

  :disabled {
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
  }

  ${({ property }) =>
    property === 'kakao' &&
    css`
      height: 49px;
      color: #191919 !important;
      img {
        position: absolute;
        left: 34px;
      }
      p {
        font-family: 'Spoqa Han Sans Neo';
        font-weight: 500;
        position: absolute;
      }
    `};
`;
