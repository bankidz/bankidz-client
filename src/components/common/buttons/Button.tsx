import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Kakao } from '@assets/icons/kakao.svg';
import { ReactComponent as Apple } from '@assets/icons/apple.svg';
import { darken } from 'polished';
import { theme } from '@lib/styles/theme';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  property?: 'default' | 'kakao' | 'delete' | 'sub' | 'apple';
  label: string;
  state?: boolean;
  fixed?: boolean;
}

/**
 * @param property 기본, 카카오로그인, 삭제, 강조되지 않은 버튼, 아웃라인
 * @param label 버튼 내용
 * @param state 버튼 활성화 상태
 * @param fixed 너비 고정, 가운데 정렬인 버튼 (모달->삭제하기)
 */
function Button({
  property = 'default',
  label,
  state = true,
  fixed = false,
  ...props
}: ButtonProps) {
  return (
    <Wrapper
      property={property}
      state={state}
      disabled={!state}
      fixed={fixed}
      {...props}
    >
      {property === 'kakao' && <Kakao />}
      {property === 'apple' && <Apple />}
      <p>{label}</p>
    </Wrapper>
  );
}

export default Button;

const handleColorType = (
  property: 'default' | 'kakao' | 'delete' | 'sub' | 'apple',
) => {
  const defaultColor = theme.palette.main.yellow300;
  const subColor = theme.palette.greyScale.grey300;
  const deleteColor = theme.palette.sementic.red300;
  const kakaoColor = '#fee500';
  const appleColor = '#000';

  switch (property) {
    case 'default':
      return defaultColor;
    case 'sub':
      return subColor;
    case 'delete':
      return deleteColor;
    case 'kakao':
      return kakaoColor;
    case 'apple':
      return appleColor;
  }
};

const Wrapper = styled.button<{
  property: 'default' | 'kakao' | 'delete' | 'sub' | 'apple';
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
    (property === 'kakao' || property === 'apple') &&
    css`
      height: 49px;
      color: ${property === 'kakao' ? '#191919' : '#ffffff'};
      svg {
        margin-right: ${property === 'kakao' ? '8px' : '0px'};

        margin-left: ${property === 'kakao' ? '#0px' : '-8px'};
      }
      p {
        font-family: 'Spoqa Han Sans Neo';
        font-weight: 500;
        margin-bottom: -3px;
      }
    `};
`;
