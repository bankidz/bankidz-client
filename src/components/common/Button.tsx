import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import kakao from '../../assets/icons/kakao.svg';

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
}

function Button({
  property = 'primary',
  label,
  state = true,
  ...props
}: ButtonProps) {
  return (
    <Wrapper property={property} state={state} disabled={!state} {...props}>
      {property == 'etc' && <img src={kakao} />}
      <p>{label}</p>
    </Wrapper>
  );
}

export default Button;

const Wrapper = styled.button<{
  property: 'etc' | 'primary' | 'secondary';
  state: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ property }) => (property == 'secondary' ? '160px' : '100%')};
  height: 50px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  ${({ property }) =>
    property == 'etc'
      ? css`
          color: #191919;
          background-color: #fee500;

          img {
            display: flex;
            padding-right: 280px;
          }
          p {
            position: absolute;
          }
        `
      : css`
          color: ${({ theme }) => theme.palette.white};
          background-color: ${({ theme }) => theme.palette.yellow[0]};
        `};

  :disabled {
    background-color: ${({ theme }) => theme.palette.gray[2]};
    color: ${({ theme }) => theme.palette.gray[5]};
  }
`;
